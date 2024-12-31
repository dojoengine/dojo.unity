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

print_status "Extracting platform-specific bindings..."

# Extract bindings for each platform
castffi extract --config Bindings/config-extract-linux.json > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to extract Linux bindings"
    exit 1
fi

castffi extract --config Bindings/config-extract-macos.json > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to extract macOS bindings"
    exit 1
fi

castffi extract --config Bindings/config-extract-windows.json > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to extract Windows bindings"
    exit 1
fi

print_status "Merging platform bindings..."

# Merge platform abstract syntax tree .json files
castffi merge --inputDirectoryPath Bindings/ast --outputFilePath Bindings/ast/cross-platform.json > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to merge platform bindings"
    exit 1
fi

print_status "Generating C# bindings..."

# Generate C# bindings
./c2cs/artifacts/bin/C2CS.Tool/release/C2CS.Tool generate --config Bindings/config-generate-cs.json > /dev/null 2>&1
if [ $? -ne 0 ]; then
    print_error "Failed to generate C# bindings"
    exit 1
fi

print_success "✨ Bindings generation complete!"
print_status "Done! 🎮"