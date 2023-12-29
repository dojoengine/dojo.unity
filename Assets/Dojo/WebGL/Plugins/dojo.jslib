mergeInto(LibraryManager.library, {
    // Initializes the wasm module
    WasmBindgen: async function() {
        await wasm_bindgen();
    },
    // Creates a new client and returns the pointer to it
    CreateClient: async function(
        rpcUrl,
        toriiUrl,
        worldAddress
    ) {
        var client = await wasm_bindgen.createClient([], {
            rpcUrl: UTF8ToString(rpcUrl),
            toriiUrl: UTF8ToString(toriiUrl),
            worldAddress: UTF8ToString(worldAddress)
        });

        return client.__wbg_ptr;
    },
    // Returns a dictionary of all of the entities
    GetEntities: async function(clientPtr, limit, offset) {
        var client = wasm_bindgen.Client.__wrap(clientPtr);
        var entities = await client.getEntities(limit, offset);

        // stringify the entities
        var entitiesString = JSON.stringify(entities);
        // return buffer
        var bufferSize = lengthBytesUTF8(entitiesString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(entitiesString, buffer, bufferSize);

        return buffer;
    },
    // Returns a dictionary of all of the entities corresponding
    // to the model and keys
    GetEntitiesByKeys: async function(clientPtr, model, keys, limit, offset) {
        var client = wasm_bindgen.Client.__wrap(clientPtr);
        var entities = await client.getEntitiesByKeys(
            UTF8ToString(model),
            UTF8ToString(keys),
            limit,
            offset
        );

        // stringify the entities
        var entitiesString = JSON.stringify(entities);
        // return buffer
        var bufferSize = lengthBytesUTF8(entitiesString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(entitiesString, buffer, bufferSize);

        return buffer;
    },
    // Get the value of a model for a specific set of keys
    GetModelValue: async function(clientPtr, model, keys) {
        var client = wasm_bindgen.Client.__wrap(clientPtr);
        var modelValue = await client.getModelValue(
            UTF8ToString(model),
            JSON.parse(UTF8ToString(keys))
        );

        // stringify the model value
        var modelValueString = JSON.stringify(modelValue);
        // return buffer
        var bufferSize = lengthBytesUTF8(modelValueString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(modelValueString, buffer, bufferSize);

        return buffer;
    },
});