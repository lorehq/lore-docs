# Contributing to Lore Docs

Thanks for your interest in improving the Lore documentation.

## Local Setup

```bash
git clone https://github.com/lorehq/lore-docs.git
cd lore-docs
pip install mkdocs-material
mkdocs serve
```

Site will be available at `http://localhost:8000`.

## Pull Requests

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `mkdocs build --strict` to verify no broken links or build errors
4. Open a pull request

## What We're Looking For

- Typo and clarity fixes
- New guides or examples
- Improved diagrams or architecture docs
- Broken link fixes

## Guidelines

- Keep changes focused — one concern per PR
- Match existing tone and structure
- Test locally with `mkdocs serve` before submitting

## Reporting Issues

Use [GitHub Issues](../../issues). For security vulnerabilities, see [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions will be licensed under the Apache-2.0 license.
