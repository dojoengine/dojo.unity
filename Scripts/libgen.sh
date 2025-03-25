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

# Define the targets
targets=("x86_64-unknown-linux-gnu" "x86_64-apple-darwin" "aarch64-apple-darwin" "x86_64-pc-windows-gnu" "aarch64-apple-ios")

cd ./Bindings/dojo.c

# Determine build type
if [[ "$1" == "debug" ]]; then
    build="debug"
    print_status "Building in debug mode..."
else
    build="release"
    print_status "Building in release mode..."
fi

print_status "Setting up linkers..."

# Configure linkers
# Windows linker
export CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER=x86_64-w64-mingw32-gcc
# Replace by Unity path
# Armv7 android linker
export CARGO_TARGET_ARMV7_LINUX_ANDROIDEABI_LINKER="$(ls /Applications/Unity/Hub/Editor/*/PlaybackEngines/AndroidPlayer/NDK/toolchains/llvm/prebuilt/*/bin/armv7a-linux-androideabi*-clang | sort | tail -n 1)"
# Arm64 android linker
export CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER="$(ls /Applications/Unity/Hub/Editor/*/PlaybackEngines/AndroidPlayer/NDK/toolchains/llvm/prebuilt/*/bin/aarch64-linux-android*-clang | sort | tail -n 1)"

print_status "Building targets..."

# Loop over the targets
for target in "${targets[@]}"; do
    print_status "Building for $target..."
    rm -rf "../../Assets/Dojo/Libraries/$target"

    # Create temporary log file
    log_file=$(mktemp)

    # Build binary for the target
    if [[ "$target" == "x86_64-unknown-linux-gnu" ]]; then
        # Use cross for Linux build
        if [[ "$build" == "release" ]]; then
            cross build --release --target "$target" > "$log_file" 2>&1
        else
            cross build --target "$target" > "$log_file" 2>&1
        fi
    else
        # Regular cargo build for other targets
        if [[ "$build" == "release" ]]; then
            cargo build --release --target "$target" > "$log_file" 2>&1
        else
            cargo build --target "$target" > "$log_file" 2>&1
        fi
    fi
    
    build_status=$?
    if [ $build_status -ne 0 ]; then
        print_error "Failed to build for $target"
        print_error "Build output:"
        cat "$log_file"
        rm "$log_file"
        exit $build_status
    fi
    
    rm "$log_file"
done

print_status "Copying binaries to Unity project..."

# Windows    
print_status "Setting up Windows plugins..."
mkdir -p "../../Assets/Dojo/Plugins/Windows"
cp -f "target/x86_64-pc-windows-gnu/$build/dojo_c.dll" "../../Assets/Dojo/Plugins/Windows/libdojo_c.dll"

# Linux
print_status "Setting up Linux plugins..."
mkdir -p "../../Assets/Dojo/Plugins/Linux"
cp -f "target/x86_64-unknown-linux-gnu/$build/libdojo_c.so" "../../Assets/Dojo/Plugins/Linux/libdojo_c.so"

# macOS
print_status "Setting up macOS plugins..."
mkdir -p "../../Assets/Dojo/Plugins/macOS"
# we need to bundle the x86_64 and arm64 libraries into a single fat binary
lipo -create -output "../../Assets/Dojo/Plugins/macOS/libdojo_c.bundle" \
    "target/x86_64-apple-darwin/$build/libdojo_c.dylib" \
    "target/aarch64-apple-darwin/$build/libdojo_c.dylib" 

# iOS
print_status "Setting up iOS plugins..."
mkdir -p "../../Assets/Dojo/Plugins/iOS"
cp -f "target/aarch64-apple-ios/$build/libdojo_c.a" "../../Assets/Dojo/Plugins/iOS/libdojo_c.a"

print_success "✨ Build complete!"
print_status "Done! 🎮"

