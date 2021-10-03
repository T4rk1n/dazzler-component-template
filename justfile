set dotenv-load := false

dir := justfile_directory()
src := dir + "/src"
components := src + "/ts/components"

# Install  pip requirements & node modules.
install:
    pip install -r requirements.txt
    npm install

# Generate the python class for the components
generate:
    dazzler generate {{components}} src/python/dazzler_component_template --ts

# Build the webpack bundle
build-js:
    npm run build

# Generate component and build the bundle
build: generate build-js

# Run the test application.
run:
    #!/usr/bin/bash

    function main() {
        export PYTHONPATH={{src}}/python:$PYTHONPATH
        cd {{dir}}/tests
        python app.py
    }
    main

# Package the application for distribution using python wheel.
package: build
    rm -rf dist
    rm -rf build
    python -m build --wheel

# Publish the package to pypi using twine.
publish: package
    twine upload dist/*
