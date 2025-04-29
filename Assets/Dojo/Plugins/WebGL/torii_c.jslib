mergeInto(LibraryManager.library, {
  Connect: async function (controllerConfig) {
    // parse the controller config string
    const prvider = new ControllerProvider(config)
    await prvider.connect()

    prvider.account.execute(  )
  }

  // Creates a new client and returns the pointer to it
  CreateClient: async function (
    toriiUrl,
    relayUrl,
    worldAddress,
    cb
  ) {
    let client = await wasm_bindgen.createClient({
      toriiUrl: UTF8ToString(toriiUrl),
      relayUrl: UTF8ToString(relayUrl),
      worldAddress: UTF8ToString(worldAddress),
    });

    dynCall_vi(cb, client.__destroy_into_raw());
  },
  // Returns an array of all tokens
  GetTokens: async function (clientPtr, contractAddresses, tokenIds, limit, offset, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const tokens = await client.getTokens(JSON.parse(UTF8ToString(contractAddresses)), JSON.parse(UTF8ToString(tokenIds)), limit, offset);

    const tokensString = JSON.stringify(tokens);
    const bufferSize = lengthBytesUTF8(tokensString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(tokensString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns an array of all token balances
  GetTokenBalances: async function (clientPtr, contractAddresses, accountAddresses, tokenIds, limit, offset, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const balances = await client.getTokenBalances(JSON.parse(UTF8ToString(contractAddresses)), JSON.parse(UTF8ToString(accountAddresses)), JSON.parse(UTF8ToString(tokenIds)), limit, offset);

    const balancesString = JSON.stringify(balances);
    const bufferSize = lengthBytesUTF8(balancesString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(balancesString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the entities
  GetEntities: async function (clientPtr, queryString, historical, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    let entities = await client.getEntities(query, historical);

    // stringify the entities
    let entitiesString = JSON.stringify(entities);
    // return buffer
    let bufferSize = lengthBytesUTF8(entitiesString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(entitiesString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the eventmessages
  GetEventMessages: async function (clientPtr, queryString, historical, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    let entities = await client.getEventMessages(query, historical);

    // stringify the entities
    let entitiesString = JSON.stringify(entities);
    // return buffer
    let bufferSize = lengthBytesUTF8(entitiesString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(entitiesString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Get the value of a model for a specific set of keys
  GetModelValue: async function (clientPtr, model, keys, cb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let modelValue = await client.getModelValue(
      UTF8ToString(model),
      JSON.parse(UTF8ToString(keys))
    );

    // stringify the model value
    let modelValueString = JSON.stringify(modelValue);
    // return buffer
    let bufferSize = lengthBytesUTF8(modelValueString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(modelValueString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  OnTokenUpdated: async function (clientPtr, contractAddresses, tokenIds, cb, subCb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const subscription = await client.onTokenUpdated(
      JSON.parse(UTF8ToString(contractAddresses)),
      JSON.parse(UTF8ToString(tokenIds)),
      (token) => {
        const tokenString = JSON.stringify(token);
        const bufferSize = lengthBytesUTF8(tokenString) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(tokenString, buffer, bufferSize);

      client.__destroy_into_raw();
      dynCall_vi(cb, buffer);
    });

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  OnTokenBalanceUpdated: async function (clientPtr, contractAddresses, accountAddresses, tokenIds, cb, subCb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const subscription = await client.onTokenBalanceUpdated(
      JSON.parse(UTF8ToString(contractAddresses)),
      JSON.parse(UTF8ToString(accountAddresses)),
      JSON.parse(UTF8ToString(tokenIds)),
      (balance) => {
        const balanceString = JSON.stringify(balance);
        const bufferSize = lengthBytesUTF8(balanceString) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(balanceString, buffer, bufferSize);

      client.__destroy_into_raw();
      dynCall_vi(cb, buffer);
    });

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  OnEntityUpdated: async function (clientPtr, clausesStr, cb, subCb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let clauses = JSON.parse(UTF8ToString(clausesStr));

    const subscription = await client.onEntityUpdated(clauses, (hashed_keys, models) => {
      // stringify the models
      let modelsString = JSON.stringify(models);
      // return buffer
      let hashedKeysBufferSize = lengthBytesUTF8(hashed_keys) + 1;
      let hashedKeysBuffer = _malloc(hashedKeysBufferSize);
      let modelsBufferSize = lengthBytesUTF8(modelsString) + 1;
      let modelsBuffer = _malloc(modelsBufferSize);
      stringToUTF8(hashed_keys, hashedKeysBuffer, hashedKeysBufferSize);
      stringToUTF8(modelsString, modelsBuffer, modelsBufferSize);

      dynCall_vii(cb, hashedKeysBuffer, modelsBuffer);
    });

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEntitySubscription: async function (clientPtr, subPtr, clausesStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clauses = JSON.parse(UTF8ToString(clausesStr));

    await client.updateEntitySubscription(subscription, clauses);

    client.__destroy_into_raw();
    subscription.__destroy_into_raw();
  },
  OnEventMessageUpdated: async function (clientPtr, clausesStr, cb, subCb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let clauses = JSON.parse(UTF8ToString(clausesStr));

    const subscription = await client.onEventMessageUpdated(
      clauses,
      (hashed_keys, models) => {
        // stringify the entities
        let modelsString = JSON.stringify(models);
        // return buffer
        let hashedKeysBufferSize = lengthBytesUTF8(hashed_keys) + 1;
        let hashedKeysBuffer = _malloc(hashedKeysBufferSize);
        let modelsBufferSize = lengthBytesUTF8(modelsString) + 1;
        let modelsBuffer = _malloc(modelsBufferSize);
        stringToUTF8(hashed_keys, hashedKeysBuffer, hashedKeysBufferSize);
        stringToUTF8(modelsString, modelsBuffer, modelsBufferSize);

        dynCall_vii(cb, hashedKeysBuffer, modelsBuffer);
      }
    );

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEventMessageSubscription: async function (clientPtr, subPtr, clausesStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clauses = JSON.parse(UTF8ToString(clausesStr));

    await client.updateEventMessageSubscription(subscription, clauses);

    client.__destroy_into_raw();
    subscription.__destroy_into_raw();
  },
  AddModelsToSync: function (clientPtr, models) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    client.__destroy_into_raw();
    client.addModelsToSync(modelsArray);
  },
  RemoveModelsToSync: function (clientPtr, models) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    client.__destroy_into_raw();
    client.removeModelsToSync(modelsArray);
  },
  OnSyncModelChange: async function (
    clientPtr,
    models,
    callbackObjectName,
    callbackMethodName
  ) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    const subscription = await client.onSyncModelChange(modelsArray, () => {
      gameInstance.SendMessage(
        UTF8ToString(callbackObjectName),
        UTF8ToString(callbackMethodName)
      );
    });
    subscription.__destroy_into_raw();

    client.__destroy_into_raw();
  },
  // Encode typed data with the corresponding address and return the message hash
  // typedData: JSON string
  // address: string
  EncodeTypedData: function (typedData, address) {
    let encodedTypedData = wasm_bindgen.typedDataEncode(
      UTF8ToString(typedData),
      UTF8ToString(address)
    );

    // return buffer
    let bufferSize = lengthBytesUTF8(encodedTypedData) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(encodedTypedData, buffer, bufferSize);

    return buffer;
  },
  // Publishes a message and returns its ID
  // message: typed data JSON string
  // signature: string[]
  PublishMessage: async function (clientPtr, message, signature, cb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const published = await client.publishMessage(
      UTF8ToString(message),
      JSON.parse(UTF8ToString(signature)),
    );
    const publishedString = JSON.stringify(Array.from(published));
    const bufferSize = lengthBytesUTF8(publishedString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(publishedString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
});
