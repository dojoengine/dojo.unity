
:: Run CAstFfi extract with Windows configuration
castffi extract --config ..//bindings/config-extract-windows.json
castffi extract --config ..//bindings/config-extract-macos.json
castffi extract --config ..//bindings/config-extract-linux.json

:: Merge platform abstract syntax tree .json files into a cross-platform abstract syntax tree
castffi merge --inputDirectoryPath ..//bindings/ast --outputFilePath ..//bindings/ast\cross-platform.json

:: Run c2cs generate with the specified configuration
c2cs generate --config ..//bindings/config-generate-cs.json

:: Pause and wait for a key press to continue
pause
