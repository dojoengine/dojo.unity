# Get rid of old wasm package
rm -rf ./Assets/WebGLTemplates/Dojo/TemplateData/dojo.js/*

# Build the wasm package
cd ./Bindings/dojo.c

./scripts/build_wasm.sh

# Copy the wasm package to the webgl template
cp ./pkg/* ../../Assets/WebGLTemplates/Dojo/TemplateData/dojo.js