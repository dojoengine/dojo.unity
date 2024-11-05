# dojo.c

This package provides C and low-level Wasm32 bindings for the Torii Client SDK, as well as for the starknet-rs library.

The approach is to generate a C client using `cbindgen` and a wasm module using `wasm-bindgen` that are interropeable in applications exporting to both native platforms and web browsers.

## Building

```bash
# Build for current platform
cargo build --release
```

### Native platform

```bash
rustup target add x86_64-unknown-linux-gnu
cargo build --release --target x86_64-unknown-linux-gnu
```

### Wasm

```bash
# Building wasm32 binary
cargo build --release --target wasm32-unknown-unknown
# Building using wasm-pack
cd pkg && bunx wasm-pack build --release
```

## Running

```bash
# Building dojo.c
cargo build --release
# Linking dojo.c and building example
clang example/main.c target/release/libdojo_c.dylib
# Running example
./a.out
```
