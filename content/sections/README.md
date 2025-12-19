# Markdown sections (non-technical friendly)

Each top-level folder is a section (Overview, Products, Infrastructure, Protocol, Research).
Inside each folder you can add one or more Markdown files. The app auto-discovers and renders everything—no code changes.

## How to add content to a section
1) Pick the section folder (e.g. `products/`).
2) Add a new Markdown file using `NN-title.md` so files sort correctly, for example:
   - `01-readme.md` (shows first, title is taken from `# ...` line)
   - `02-dcap-dashboard.md`
   - `03-explorer.md`
3) Put the page title as the first heading in the file, e.g. `# DCAP Dashboard`.
4) Save. The site will pick it up automatically.

## How to remove content
Delete the Markdown file inside the section folder. The app will stop showing it.

## Notes
- Section order is fixed to: Overview → Products → Infrastructure → Protocol → Research.
- File order inside a section is based on the leading number (`NN`). Files without a number appear after numbered files.
- Links open in a new tab. Tables, lists, and code fences are supported.
