#!/bin/bash

castffi extract --config ./bindings/config-extract-linux.json
castffi extract --config ./bindings/config-extract-macos.json
castffi extract --config ./bindings/config-extract-windows.json

# Merge platform abstract syntax tree .json files into a cross-platform abstract syntax tree.
castffi merge --inputDirectoryPath ./bindings/ast --outputFilePath ./bindings/ast/cross-platform.json

c2cs generate --config bindings/config-generate-cs.json