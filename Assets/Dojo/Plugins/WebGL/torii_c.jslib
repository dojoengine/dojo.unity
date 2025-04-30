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
  GetTokens: async function (clientPtr, contractAddresses, tokenIds, limit, cursor, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const tokensPage = await client.getTokens(JSON.parse(UTF8ToString(contractAddresses)), JSON.parse(UTF8ToString(tokenIds)), limit, UTF8ToString(cursor));

    const tokensPageString = JSON.stringify(tokensPage);
    const bufferSize = lengthBytesUTF8(tokensPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(tokensPageString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns an array of all token balances
  GetTokenBalances: async function (clientPtr, contractAddresses, accountAddresses, tokenIds, limit, cursor, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const balancesPage = await client.getTokenBalances(JSON.parse(UTF8ToString(contractAddresses)), JSON.parse(UTF8ToString(accountAddresses)), JSON.parse(UTF8ToString(tokenIds)), limit, UTF8ToString(cursor));

    const balancesPageString = JSON.stringify(balancesPage);
    const bufferSize = lengthBytesUTF8(balancesPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(balancesPageString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the entities
  GetEntities: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    let entitiesPage = await client.getEntities(query);

    // stringify the entities page
    let entitiesPageString = JSON.stringify(entitiesPage);
    // return buffer
    let bufferSize = lengthBytesUTF8(entitiesPageString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(entitiesPageString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the eventmessages
  GetEventMessages: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    let eventMessagesPage = await client.getEventMessages(query);

    // stringify the event messages page
    let eventMessagesPageString = JSON.stringify(eventMessagesPage);
    // return buffer
    let bufferSize = lengthBytesUTF8(eventMessagesPageString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(eventMessagesPageString, buffer, bufferSize);

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
  OnEntityUpdated: async function (clientPtr, clauseStr, cb, subCb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let clause = null;
    if (clauseStr) {
        let clauseJsonString = UTF8ToString(clauseStr);
        if (clauseJsonString && clauseJsonString !== "null") {
            try {
                clause = JSON.parse(clauseJsonString); 
            } catch (e) {
                console.error("Failed to parse clause JSON in OnEntityUpdated:", clauseJsonString, e);
            }
        }
    }

    const subscription = await client.onEntityUpdated(clause, (hashed_keys, models) => {
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
  UpdateEntitySubscription: async function (clientPtr, subPtr, clauseStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = null;
    if (clauseStr) {
        let clauseJsonString = UTF8ToString(clauseStr);
        if (clauseJsonString && clauseJsonString !== "null") {
            try {
                clause = JSON.parse(clauseJsonString); 
            } catch (e) {
                console.error("Failed to parse clause JSON in UpdateEntitySubscription:", clauseJsonString, e);
            }
        }
    }

    await client.updateEntitySubscription(subscription, clause);

    client.__destroy_into_raw();
    subscription.__destroy_into_raw();
  },
  OnEventMessageUpdated: async function (clientPtr, clauseStr, cb, subCb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let clause = null;
    if (clauseStr) {
        let clauseJsonString = UTF8ToString(clauseStr);
        if (clauseJsonString && clauseJsonString !== "null") {
            try {
                clause = JSON.parse(clauseJsonString); 
            } catch (e) {
                console.error("Failed to parse clause JSON in OnEventMessageUpdated:", clauseJsonString, e);
            }
        }
    }

    const subscription = await client.onEventMessageUpdated(
      clause,
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
  UpdateEventMessageSubscription: async function (clientPtr, subPtr, clauseStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = null;
    if (clauseStr) {
        let clauseJsonString = UTF8ToString(clauseStr);
        if (clauseJsonString && clauseJsonString !== "null") {
            try {
                clause = JSON.parse(clauseJsonString); 
            } catch (e) {
                console.error("Failed to parse clause JSON in UpdateEventMessageSubscription:", clauseJsonString, e);
            }
        }
    }

    await client.updateEventMessageSubscription(subscription, clause);

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
