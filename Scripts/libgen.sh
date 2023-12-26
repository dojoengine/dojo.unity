#!/bin/bash
# Define the targets

targets=("x86_64-unknown-linux-gnu" "x86_64-apple-darwin" "aarch64-apple-darwin" "x86_64-pc-windows-gnu")

if [[ "$1" == "release" ]]; then
  build="release"
else
  build="debug"
fi

export CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_LINKER=x86_64-unknown-linux-gnu-gcc
cd ./Bindings/dojo.c
# Loop over the targets
for target in "${targets[@]}"; do
  # Build binary for the target
  if [[ "$build" == "release" ]]; then
    cargo build --release --target "$target"
  else
    cargo build --target "$target"
  fi


  # Copy binary to Unity package Libraries dir
  if [[ "$target" == "x86_64-pc-windows-gnu" ]]; then
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/torii_c.dll" "../../Assets/Dojo/Libraries/$target/libtorii_c.dll"
  elif [[ "$target" == "x86_64-unknown-linux-gnu" ]]; then
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libtorii_c.so" "../../Assets/Dojo/Libraries/$target/libtorii_c.so"
  else
    mkdir -p "../../Assets/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libtorii_c.dylib" "../../Assets/Dojo/Libraries/$target/libtorii_c.dylib"
  fi
done
