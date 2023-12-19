#!/bin/bash

castffi extract --config Bindings/config-extract-linux.json
castffi extract --config Bindings/config-extract-macos.json
castffi extract --config Bindings/config-extract-windows.json

# Merge platform abstract syntax tree .json files into a cross-platform abstract syntax tree.
castffi merge --inputDirectoryPath Bindings/ast --outputFilePath Bindings/ast/cross-platform.json

./c2cs/artifacts/bin/C2CS.Tool/debug/C2CS.Tool generate --config Bindings/config-generate-cs.json