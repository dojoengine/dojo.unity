mergeInto(LibraryManager.library, {
    LoadDojoWasm: async function () [
        WebAssembly.instantiateStreaming(fetch('dojo.wasm'), {})
    ]
});