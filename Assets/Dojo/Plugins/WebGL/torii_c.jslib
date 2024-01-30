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

    window.toriiClient = client;

    // gameInstance.SendMessage(
    //   UTF8ToString(callbackObjectName),
    //   UTF8ToString(callbackMethodName),
    //   client.__wbg_ptr
    // );
    dynCall_vi(cb, client.__wbg_ptr);
  },
  // Returns a dictionary of all of the entities
  GetEntities: async function (clientPtr, limit, offset, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var entities = await client.getEntities(limit, offset);

    // stringify the entities
    var entitiesString = JSON.stringify(entities);
    // return buffer
    var bufferSize = lengthBytesUTF8(entitiesString) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(entitiesString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the entities corresponding
  // to the model and keys
  GetEntitiesByKeys: async function (
    clientPtr,
    model,
    keys,
    limit,
    offset,
    cb
  ) {
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
  },
  AddModelsToSync: function (clientPtr, models) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var modelsString = UTF8ToString(models);
    var modelsArray = JSON.parse(modelsString);

    client.addModelsToSync(modelsArray);
  },
  RemoveModelsToSync: function (clientPtr, models) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    var modelsString = UTF8ToString(models);
    var modelsArray = JSON.parse(modelsString);

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
  },
  // Subscribes to a topic
  SubscribeTopic: async function (clientPtr, topic, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    const subscribed = await client.subscribeTopic(UTF8ToString(topic));
    dynCall_vi(cb, subscribed);
  },
  // Unsubscribes from a topic
  UnsubscribeTopic: async function (clientPtr, topic, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    const unsubscribed = await client.unsubscribeTopic(UTF8ToString(topic));
    dynCall_vi(cb, unsubscribed);
  },
  // Publishes a message to topic and returns the message id
  PublishMessage: async function (clientPtr, topic, message, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    const published = await client.publishMessage(UTF8ToString(topic), JSON.parse(UTF8ToString(message)));
    const publishedString = JSON.stringify(Array.from(published));
    const bufferSize = lengthBytesUTF8(publishedString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(publishedString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  OnMessage: async function (clientPtr, cb) {
    var client = wasm_bindgen.Client.__wrap(clientPtr);
    client.onMessage((propagationSource, source, messageId, topic, data) => {
      const messageString = JSON.stringify({
        propagationSource,
        source,
        messageId,
        topic,
        data: Array.from(data),
      });

      const bufferSize = lengthBytesUTF8(messageString) + 1;
      const buffer = _malloc(bufferSize);
      stringToUTF8(messageString, buffer, bufferSize);

      dynCall_vi(cb, buffer);
    });
  },
});
