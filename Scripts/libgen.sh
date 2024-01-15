#!/bin/bash
# Define the targets

targets=("x86_64-unknown-linux-gnu" "x86_64-apple-darwin" "aarch64-apple-darwin" "x86_64-pc-windows-gnu" "aarch64-apple-ios")

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
cd ./Bindings/dojo.c
# Loop over the targets
for target in "${targets[@]}"; do
  rm -rf "../../Assets/Dojo/Libraries/$target"

  # Build binary for the target
  if [[ "$build" == "release" ]]; then
    cargo build --release --target "$target"
  else
    cargo build --target "$target"
  fi


  # Copy binary to Unity package Libraries dir
  if [[ "$target" == "x86_64-pc-windows-gnu" ]]; then
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/dojo_c.dll" "../../Assets/Dojo/Libraries/$target/libdojo_c.dll"
  elif [[ "$target" == "x86_64-unknown-linux-gnu" ]]; then
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libdojo_c.so" "../../Assets/Dojo/Libraries/$target/libdojo_c.so"
  else
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libdojo_c.dylib" "../../Assets/Dojo/Libraries/$target/libdojo_c.dylib"
  fi
done
