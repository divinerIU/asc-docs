# Developer Notes / 开发者指南

How to view the docs locally

- From the repository root run:

```bash
python -m http.server
# Then open http://localhost:8000/docs/index.html
```

Running tests

- Unit tests live under the `tests/` directory. After activating your Python environment, run your preferred test runner (for example `pytest`).

Key locations

- Package source: `src/agentic_simulink_cli/`
- Supported external CLI entry: `asc setup` via `src/agentic_simulink_cli/main.py`
- Modules docs: `docs/modules/`

CLI scope

- Treat `asc setup` as the only supported external startup path.
- Do not maintain parallel module-execution entrypoints like `python -m agentic_simulink_cli`; keep them pointing users back to `asc setup`.

Editing docs

- The `index.html` in `docs/` loads the markdown files under `docs/modules/` for a convenient browser view. Edit the Markdown files there and refresh the page.
