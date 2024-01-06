# dojo.c

This package provides C bindings for the Torii Client SDK. The approach is to generate a C client using `cbindgen`.

## Running

```
cargo build --release
gcc example/main.c -L target/release -l torii_c -I ..
```
