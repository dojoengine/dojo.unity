#!/bin/bash

castffi extract --config ./Dojo/bindings/config-extract-linux.json
castffi extract --config ./Dojo/bindings/config-extract-macos.json
castffi extract --config ./Dojo/bindings/config-extract-windows.json

# Merge platform abstract syntax tree .json files into a cross-platform abstract syntax tree.
castffi merge --inputDirectoryPath ./Dojo/bindings/ast --outputFilePath ./Dojo/bindings/ast/cross-platform.json

/Users/nasr/Documents/development.nosync/c2cs/artifacts/bin/C2CS.Tool/debug/C2CS.Tool generate --config ./Dojo/bindings/config-generate-cs.json