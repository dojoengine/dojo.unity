#!/bin/bash

# Print colorful status messages
print_status() {
    echo -e "\033[1;34m$1\033[0m"
}

print_error() {
    echo -e "\033[1;31m$1\033[0m"
}

print_success() {
    echo -e "\033[1;32m$1\033[0m"
}

print_status "Cleaning old WASM package..."
rm -rf ./Assets/WebGLTemplates/Dojo/TemplateData/dojo.js/*
if [ $? -ne 0 ]; then
    print_error "Failed to clean old WASM package"
    exit 1
fi

print_status "Building WASM package..."
cd ./Bindings/dojo.c
./scripts/build_wasm.sh > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to build WASM package"
    exit 1
fi

print_status "Copying WASM package to WebGL template..."
cp ./pkg/* ../../Assets/WebGLTemplates/Dojo/TemplateData/dojo.js
if [ $? -ne 0 ]; then
    print_error "Failed to copy WASM package"
    exit 1
fi

print_success "✨ WASM generation complete!"
print_status "Done! 🎮"