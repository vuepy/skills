import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'

const ROOT = path.dirname(fileURLToPath(import.meta.url))
const DOCS_ROOT = path.join(ROOT, 'vuepy_docs')
const CONFIG_PATH = path.join(DOCS_ROOT, '.vitepress/config.ts')
const DIST_MD = path.join(DOCS_ROOT, '.vitepress/dist_md')
const SKILLS_DIR = path.join(ROOT, 'skills')
const TEMPLATES_DIR = path.join(ROOT, 'templates')
const PLACEHOLDER = '<!-- CONTENT_PLACEHOLDER -->'

const PACKAGES = [
  {
    name: 'vuepy',
    template: 'vuepy-skills.md',
    sections: ['/guide/', '/api/'],
    format: 'list',
  },
  {
    name: 'vuepy-ipywui',
    template: 'ipywui-skills.md',
    sections: ['/ipywui/'],
    format: 'table',
  },
  {
    name: 'vuepy-vleaflet',
    template: 'vleaflet-skills.md',
    sections: ['/vleaflet/'],
    format: 'table',
  },
  {
    name: 'panel_vuepy',
    template: 'panel_vuepy-skills.md',
    sections: ['/panel_vuepy/'],
    format: 'table',
  },
  {
    name: 'textual_vuepy',
    template: 'textual_vuepy-skills.md',
    sections: ['/textual_vuepy/'],
    format: 'table',
  },
]

const sidebar = loadSidebar()
const copied = new Map()

for (const pkg of PACKAGES) {
  const skillDir = path.join(SKILLS_DIR, pkg.name)
  const referencesDir = path.join(skillDir, 'references')
  rmSync(referencesDir, { recursive: true, force: true })
  mkdirSync(referencesDir, { recursive: true })

  const content = pkg.format === 'list'
    ? renderList(pkg, skillDir)
    : renderTable(pkg, skillDir)

  const templatePath = path.join(TEMPLATES_DIR, pkg.template)
  let template = readFileSync(templatePath, 'utf8')
  if (!template.includes(PLACEHOLDER)) {
    throw new Error(`${pkg.template} 缺少 ${PLACEHOLDER}`)
  }
  template = template.replace(PLACEHOLDER, content.trimEnd())
  if (!template.endsWith('\n'))
    template += '\n'

  const outputPath = path.join(skillDir, 'SKILL.md')
  writeFileSync(outputPath, template)
  console.log(`generated ${path.relative(ROOT, outputPath)}`)
}

function renderList(pkg, skillDir) {
  const parts = []
  for (const sectionPath of pkg.sections) {
    const groups = groupsOf(sectionPath)
    const heading = sectionPath.replace(/^\/|\/$/g, '')
    const blocks = []
    for (const group of groups) {
      const items = visibleItems(group)
      if (!items.length)
        continue
      const lines = []
      for (const item of items) {
        const href = copyReference(skillDir, item.link)
        if (!href)
          continue
        lines.push(`* [${inlineText(item.text)}](${href})`)
      }
      if (!lines.length)
        continue
      blocks.push(`### ${group.text}\n\n${lines.join('\n')}`)
    }
    if (blocks.length)
      parts.push(`## ${heading}\n\n${blocks.join('\n\n')}`)
  }
  return `${parts.join('\n\n')}\n`
}

function renderTable(pkg, skillDir) {
  const parts = []
  for (const sectionPath of pkg.sections) {
    for (const group of groupsOf(sectionPath)) {
      const items = visibleItems(group)
      if (!items.length)
        continue
      const rows = []
      for (const item of items) {
        const href = copyReference(skillDir, item.link)
        if (!href)
          continue
        const description = describeReference(item.link)
        const doc = `[${inlineText(item.text)}](${href})`
        rows.push(`| ${cell(item.text)} | ${cell(description)} | ${doc} |`)
      }
      if (!rows.length)
        continue
      parts.push([
        `## ${group.text}`,
        '',
        '| 组件 | 描述 | 详细文档 |',
        '|------|------|----------|',
        ...rows,
      ].join('\n'))
    }
  }
  return `${parts.join('\n\n')}\n`
}

function groupsOf(sectionPath) {
  const groups = sidebar[sectionPath]
  if (!Array.isArray(groups))
    throw new Error(`sidebar 中没有 ${sectionPath}`)
  return groups
}

function visibleItems(group) {
  return (group.items ?? []).filter(item => item && item.link && item.text && !item.llms_ignore)
}

function copyReference(skillDir, link) {
  const rel = `${link.replace(/^\//, '')}.md`
  const href = `./references/${rel}`
  const copyKey = `${skillDir}\0${href}`
  if (copied.has(copyKey))
    return copied.get(copyKey)

  const source = path.join(DIST_MD, rel)
  if (!existsSync(source)) {
    console.warn(`skip ${link}: 没有 ${path.relative(ROOT, source)}`)
    copied.set(copyKey, null)
    return null
  }
  const target = path.join(skillDir, 'references', rel)
  mkdirSync(path.dirname(target), { recursive: true })
  copyFileSync(source, target)
  copied.set(copyKey, href)
  return href
}

function describeReference(link) {
  const rel = `${link.replace(/^\//, '')}.md`
  const source = path.join(DIST_MD, rel)
  if (!existsSync(source))
    return ''
  return firstSentenceAfterHeading(readFileSync(source, 'utf8'))
}

function firstSentenceAfterHeading(markdown) {
  let text = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  text = text.replace(/<!--[\s\S]*?-->/g, '')
  text = text.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  text = text.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')

  const lines = text.split(/\r?\n/)
  let seenHeading = false
  let inFence = false
  const paragraph = []

  for (const line of lines) {
    const trimmed = line.trim()
    const isFence = trimmed.startsWith('```') || trimmed.startsWith('~~~')
    if (!seenHeading) {
      if (/^#{1,6}\s+/.test(trimmed))
        seenHeading = true
      continue
    }
    if (isFence) {
      if (paragraph.length)
        break
      inFence = !inFence
      continue
    }
    if (inFence)
      continue
    if (/^#{1,6}\s+/.test(trimmed)) {
      if (paragraph.length)
        break
      continue
    }
    if (!trimmed) {
      if (paragraph.length)
        break
      continue
    }
    if (trimmed.startsWith(':::'))
      continue
    if (trimmed.startsWith('|')) {
      if (paragraph.length)
        break
      continue
    }
    paragraph.push(trimmed)
  }

  if (!seenHeading || !paragraph.length)
    return ''
  return firstSentence(paragraph.join(' '))
}

function firstSentence(raw) {
  const cleaned = raw
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\{#[^{}]+\}/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
  if (!cleaned)
    return ''

  const end = cleaned.search(/[。！？!?]/)
  const sentence = end === -1 ? cleaned : cleaned.slice(0, end + 1)
  if (sentence.length > 240)
    return `${sentence.slice(0, 240).trim()}…`
  return sentence.trim()
}

function cell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

function inlineText(value) {
  return String(value).replace(/]/g, '\\]')
}

function loadSidebar() {
  if (!existsSync(CONFIG_PATH))
    throw new Error(`找不到 ${CONFIG_PATH}`)
  const source = readFileSync(CONFIG_PATH, 'utf8')
  const marker = 'export const sidebar'
  const markerAt = source.indexOf(marker)
  if (markerAt < 0)
    throw new Error('config.ts 中没有 export const sidebar')
  const openAt = source.indexOf('{', markerAt)
  const objectSource = extractBraced(source, openAt)
  try {
    return vm.runInNewContext(`(${objectSource})`)
  }
  catch (error) {
    throw new Error(`无法解析 sidebar: ${error.message}`)
  }
}

function extractBraced(source, openIndex) {
  let depth = 0
  let state = 'code'
  for (let i = openIndex; i < source.length; i++) {
    const c = source[i]
    const n = source[i + 1]
    if (state === 'line') {
      if (c === '\n')
        state = 'code'
      continue
    }
    if (state === 'block') {
      if (c === '*' && n === '/') {
        state = 'code'
        i++
      }
      continue
    }
    if (state === 'sq' || state === 'dq' || state === 'template') {
      if (c === '\\') {
        i++
        continue
      }
      const quote = state === 'sq' ? '\'' : state === 'dq' ? '"' : '`'
      if (c === quote)
        state = 'code'
      continue
    }
    if (c === '/' && n === '/') {
      state = 'line'
      i++
      continue
    }
    if (c === '/' && n === '*') {
      state = 'block'
      i++
      continue
    }
    if (c === '\'') {
      state = 'sq'
      continue
    }
    if (c === '"') {
      state = 'dq'
      continue
    }
    if (c === '`') {
      state = 'template'
      continue
    }
    if (c === '{')
      depth++
    else if (c === '}') {
      depth--
      if (depth === 0)
        return source.slice(openIndex, i + 1)
    }
  }
  throw new Error('sidebar 对象没有闭合')
}
