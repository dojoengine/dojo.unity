#!/bin/bash
# Define the targets
if [[ "$1" == "release" ]]; then
    build="release"
else
    build="debug"
fi
targets=("x86_64-unknown-linux-gnu" "x86_64-apple-darwin" "aarch64-apple-darwin" "x86_64-pc-windows-gnu")

cd ./Bindings/dojo.c
# Loop over the targets
for target in "${targets[@]}"; do
  # Build binary for the target
    cargo build --target "$target" --$build

  # Copy binary to Unity package Libraries dir
  if [[ "$target" == "x86_64-pc-windows-gnu" ]]; then
    mkdir -p "../../Packages/Dojo/Libraries/$target"
    cp -f "target/$target/$build/torii_c.dll" "../../Packages/Dojo/Libraries/$target/libtorii_c.dll"
elif [[ "$target" == "x86_64-unknown-linux-gnu" ]]; then
    mkdir -p "../../Packages/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libtorii_c.so" "../../Packages/Dojo/Libraries/$target/libtorii_c.so"
else
    mkdir -p "../../Packages/Dojo/Libraries/$target"
    cp -f "target/$target/$build/libtorii_c.dylib" "../../Packages/Dojo/Libraries/$target/libtorii_c.dylib"
fi
done