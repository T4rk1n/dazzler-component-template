# Dazzler component template

- Rename package name, search for `dazzler_component_template` and replace.
- Install [just](https://github.com/casey/just).
- Create venv: `python -m venv venv`.
- Activate venv: `. venv/bin/activate`.
- Install dependencies: `just install`.
- Edit `ComponentTemplate` name, code, etc.
- Generate component `just generate`.
- Build the packages `just build`.
- Run the test application `just run`.
- Edit meta information for the package in `setup.cfg`.
- Build a wheel package: `just package`.
- Publish to pypi: `just publish`.

See all commands with `just -l`
