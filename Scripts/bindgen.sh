#!/bin/bash

castffi extract --config Packages/Dojo/Runtime/bindings/config-extract-linux.json
castffi extract --config Packages/Dojo/Runtime/bindings/config-extract-macos.json
castffi extract --config Packages/Dojo/Runtime/bindings/config-extract-windows.json

# Merge platform abstract syntax tree .json files into a cross-platform abstract syntax tree.
castffi merge --inputDirectoryPath Packages/Dojo/Runtime/bindings/ast --outputFilePath Packages/Dojo/Runtime/bindings/ast/cross-platform.json

./c2cs/artifacts/bin/C2CS.Tool/debug/C2CS.Tool generate --config Packages/Dojo/Runtime/bindings/config-generate-cs.json