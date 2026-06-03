# Skills 系统 / Skills system

中文

Skills 是可复用的 prompt 模板与能力集合：

- 在项目目录的 `.asc/skills/`、`~/.asc/skills/` 与插件目录中发现；
- 每个 skill 以 `SKILL.md` 或类似的 Markdown 描述文件定义元信息与 prompt 模板；
- `src/agentic_simulink_cli/skills.py` 负责发现、解析并运行技能；
- Skills 可声明允许的工具集合与是否允许模型直接调用（model invocation）。

English

Skills are reusable prompt templates and capability bundles:

- discovered under project `.asc/skills/`, user `~/.asc/skills/`, and plugin skill dirs;
- each skill is defined by a `SKILL.md` (or command markdown) containing metadata and a prompt template;
- `src/agentic_simulink_cli/skills.py` implements discovery, parsing and execution;
- skills can declare allowed tools and whether the model can invoke them directly.
