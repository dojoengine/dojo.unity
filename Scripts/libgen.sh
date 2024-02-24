#!/bin/bash
# Define the targets

targets=("x86_64-unknown-linux-gnu" "x86_64-apple-darwin" "aarch64-apple-darwin" "x86_64-pc-windows-gnu" "aarch64-apple-ios")

cd ./Bindings/dojo.c

if [[ "$1" == "debug" ]]; then
  build="debug"
else
  build="release"
fi

# Linux linker
export CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_LINKER=x86_64-unknown-linux-gnu-gcc
# Windows linker
export CARGO_TARGET_X86_64_PC_WINDOWS_GNU_LINKER=x86_64-w64-mingw32-gcc
# Replace by Unity path
# Armv7 android linker
export CARGO_TARGET_ARMV7_LINUX_ANDROIDEABI_LINKER="$(ls /Applications/Unity/Hub/Editor/*/PlaybackEngines/AndroidPlayer/NDK/toolchains/llvm/prebuilt/*/bin/armv7a-linux-androideabi*-clang | sort | tail -n 1)"
# Arm64 android linker
export CARGO_TARGET_AARCH64_LINUX_ANDROID_LINKER="$(ls /Applications/Unity/Hub/Editor/*/PlaybackEngines/AndroidPlayer/NDK/toolchains/llvm/prebuilt/*/bin/aarch64-linux-android*-clang | sort | tail -n 1)"
# Loop over the targets
for target in "${targets[@]}"; do
  rm -rf "../../Assets/Dojo/Libraries/$target"

  # Build binary for the target
  if [[ "$build" == "release" ]]; then
    cargo build --release --target "$target"
  else
    cargo build --target "$target"
  fi
done

# Windows    
mkdir -p "../../Assets/Dojo/Plugins/Windows"
cp -f "target/x86_64-pc-windows-gnu/$build/dojo_c.dll" "../../Assets/Dojo/Plugins/Windows/libdojo_c.dll"

# Linux
mkdir -p "../../Assets/Dojo/Plugins/Linux"
cp -f "target/x86_64-unknown-linux-gnu/$build/libdojo_c.so" "../../Assets/Dojo/Plugins/Linux/libdojo_c.so"

# macOS
mkdir -p "../../Assets/Dojo/Plugins/macOS"
# we need to bundle the x86_64 and arm64 libraries into a single fat binary
lipo -create -output "../../Assets/Dojo/Plugins/macOS/libdojo_c.bundle" \
  "target/x86_64-apple-darwin/$build/libdojo_c.dylib" \
  "target/aarch64-apple-darwin/$build/libdojo_c.dylib" 

# iOS
mkdir -p "../../Assets/Dojo/Plugins/iOS"
cp -f "target/aarch64-apple-ios/$build/libdojo_c.a" "../../Assets/Dojo/Plugins/iOS/libdojo_c.a"
