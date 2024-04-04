mergeInto(LibraryManager.library, {
  // Creates a new client and returns the pointer to it
  CreateClient: async function (
    rpcUrl,
    toriiUrl,
    relayUrl,
    worldAddress,
    // callbackObjectName,
    // callbackMethodName
    cb
  ) {
    var client = await wasm_bindgen.createClient([], {
      rpcUrl: UTF8ToString(rpcUrl),
      toriiUrl: UTF8ToString(toriiUrl),
      relayUrl: UTF8ToString(relayUrl),
      worldAddress: UTF8ToString(worldAddress),
    });

    dynCall_vi(cb, client.__destroy_into_raw());
  },
  // Returns a dictionary of all of the entities
  GetEntities: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.Client.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    var entities = await client.getEntities(query);
    console.log(entities);

    // stringify the entities
    var entitiesString = JSON.stringify(entities);
    // return buffer
    var bufferSize = lengthBytesUTF8(entitiesString) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(entitiesString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Get the value of a model for a specific set of keys
  GetModelValue: async function (clientPtr, model, keys, cb) {
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

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  OnEntityUpdated: function (clientPtr, ids, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var idsString = UTF8ToString(ids);
    var idsArray = JSON.parse(idsString);

    client.onEntityUpdated(idsArray, (entities) => {
      // stringify the entities
      var entitiesString = JSON.stringify(entities);
      // return buffer
      var bufferSize = lengthBytesUTF8(entitiesString) + 1;
      var buffer = _malloc(bufferSize);
      stringToUTF8(entitiesString, buffer, bufferSize);

      dynCall_vi(cb, buffer);
    });

    client.__destroy_into_raw();
  },
  AddModelsToSync: function (clientPtr, models) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var modelsString = UTF8ToString(models);
    var modelsArray = JSON.parse(modelsString);

    client.__destroy_into_raw();
    client.addModelsToSync(modelsArray);
  },
  RemoveModelsToSync: function (clientPtr, models) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var modelsString = UTF8ToString(models);
    var modelsArray = JSON.parse(modelsString);

    client.__destroy_into_raw();
    client.removeModelsToSync(modelsArray);
  },
  OnSyncModelChange: function (
    clientPtr,
    models,
    callbackObjectName,
    callbackMethodName
  ) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var modelsString = UTF8ToString(models);
    var modelsArray = JSON.parse(modelsString);

    client.onSyncModelChange(modelsArray, () => {
      gameInstance.SendMessage(
        UTF8ToString(callbackObjectName),
        UTF8ToString(callbackMethodName)
      );
    });
    client.__destroy_into_raw();
  },
  // Encode typed data with the corresponding address and return the message hash
  // typedData: JSON string
  // address: string
  EncodeTypedData: function (typedData, address) {
    var encodedTypedData = wasm_bindgen.typedDataEncode(
      UTF8ToString(typedData),
      UTF8ToString(address)
    );

    // return buffer
    var bufferSize = lengthBytesUTF8(encodedTypedData) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(encodedTypedData, buffer, bufferSize);

    return buffer;
  },
  // Publishes a message and returns its ID
  // message: typed data JSON string
  // signature: JSON string { r: string, s: string }
  PublishMessage: async function (clientPtr, message, signature, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    const published = await client.publishMessage(UTF8ToString(message), JSON.parse(UTF8ToString(signature)));
    console.log(published);
    const publishedString = JSON.stringify(Array.from(published));
    const bufferSize = lengthBytesUTF8(publishedString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(publishedString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
});
