![Vuepy Skills banner](./.github/assets/banner.svg)

# Vuepy Skills

Agent skills for [Vue.py](https://www.vuepy.org/). Vue.py writes Vue-style single-file components in Python, and builds interfaces in Jupyter or the terminal.

> [!IMPORTANT]
> Experimental project: help agents use Vuepy more accurately and read less unrelated documentation. Feedback is welcome.

- Progressive disclosure: show a docs index first, then read `references` when writing a specific component
- Controlled context: the index contains only a title, a one-line description, and a doc path
- Offline ready: reference docs ship with the skill and do not depend on a live network
- Fewer invented APIs: usage follows the generated references

## Included skills

| Skill | Contents |
|-------|----------|
| `vuepy` | Guide and API. Scripts are Python; refs in templates use `.value` |
| `ipywui` | Default Jupyter widgets, such as Button, Input, VBox, and HBox |
| `panel_vuepy` | Panel backend components |
| `textual_vuepy` | Terminal TUI components |
| `vleaflet` | Maps, layers, and controls |

## Installation

```bash
npx skills add vuepy/skills
```

### Claude Code Marketplace

```bash
/plugin marketplace add vuepy/skills

/plugin install vuepy@vuepy-skills
/plugin install ipywui@vuepy-skills
/plugin install panel_vuepy@vuepy-skills
/plugin install textual_vuepy@vuepy-skills
/plugin install vleaflet@vuepy-skills
```

## Example

After installing Vue.py in a project, describe the interface. The agent checks the matching skill index, then opens the reference.

```text
Build a todo list with Vuepy:
- An input and a button to add items
- Show the remaining count
- Each item can be checked off
```

Sample output:

```vue
<template>
  <VBox>
    <Input v-model="text.value" placeholder="Add a task" />
    <Button label="Add" @click="add()" />
    <Label>Remaining: {{ remaining.value }}</Label>
  </VBox>
</template>

<script lang="py">
from vuepy import ref, computed

text = ref("")
items = ref([])

def add():
    value = text.value.strip()
    if not value:
        return
    items.value = [*items.value, {"text": value, "done": False}]
    text.value = ""

remaining = computed(lambda: sum(1 for item in items.value if not item["done"]))
</script>
```

Component props and events follow the docs in `skills/<name>/references`. Do not invent APIs from the one-line index descriptions.

## Regenerating from docs

Docs come from the [`vuepy_docs`](https://github.com/vuepy/docs) submodule. `templates/*.md` holds the fixed instructions for each skill. `<!-- CONTENT_PLACEHOLDER -->` is replaced with the sidebar index at build time.

```bash
pnpm prepare:docs   # install deps in vuepy_docs and run build:md
pnpm build          # rewrite skills/*/SKILL.md and references
```

`.github/workflows/vuepy-docs-update.yml` checks `main` on `vuepy/docs` every 12 hours. When there is a new commit, it checks out that commit, rebuilds, and opens a pull request. `vuepy/docs` has no version tags, so the branch name uses the short commit SHA, for example `docs-abc1234`.

## License

[CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
