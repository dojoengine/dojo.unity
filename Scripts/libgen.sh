#!/bin/bash

# Build binary
cargo build --manifest-path Bindings/dojo.c/Cargo.toml

# Copy binary to Unity package Libraries dir
cp -f Bindings/dojo.c/target/debug/libtorii_c.dylib Packages/Dojo/Libraries/