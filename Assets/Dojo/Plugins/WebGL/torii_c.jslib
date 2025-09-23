mergeInto(LibraryManager.library, {
  // Creates a new client and returns the pointer to it
  CreateClient: async function (
    toriiUrl,
    worldAddress,
    cb
  ) {
    let client = await (new wasm_bindgen.ToriiClient({
      toriiUrl: UTF8ToString(toriiUrl),
      worldAddress: UTF8ToString(worldAddress),
    }));

    dynCall_vi(cb, client.__destroy_into_raw());
  },
  // Returns a page of all controllers
  GetControllers: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    const controllersPage = await client.getControllers(query);

    const controllersPageString = JSON.stringify(controllersPage);
    const bufferSize = lengthBytesUTF8(controllersPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(controllersPageString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a page of all tokens
  GetTokens: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    const tokensPage = await client.getTokens(query);

    const tokensPageString = JSON.stringify(tokensPage);
    const bufferSize = lengthBytesUTF8(tokensPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(tokensPageString, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  // Returns a page of all token balances
  GetTokenBalances: async function (clientPtr, queryString, cb) {
    const client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    const query = JSON.parse(UTF8ToString(queryString));
    const balancesPage = await client.getTokenBalances(query);

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
    let clause = UTF8ToString(clauseStr);

    const subscription = await client.onEntityUpdated(clause !== "" ? JSON.parse(clause) : undefined, (entity) => {
      // stringify the entity
      let entityString = JSON.stringify(entity);
      // return buffer
      let bufferSize = lengthBytesUTF8(entityString) + 1;
      let buffer = _malloc(bufferSize);
      stringToUTF8(entityString, buffer, bufferSize);

      dynCall_vi(cb, buffer);
    });

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEntitySubscription: async function (clientPtr, subPtr, clauseStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = UTF8ToString(clauseStr);

    await client.updateEntitySubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);

    client.__destroy_into_raw();
    subscription.__destroy_into_raw();
  },
  OnEventMessageUpdated: async function (clientPtr, clauseStr, cb, subCb) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let clause = UTF8ToString(clauseStr);

    const subscription = await client.onEventMessageUpdated(
      clause !== "" ? JSON.parse(clause) : undefined,
      (entity) => {
        // stringify the entity
        let entityString = JSON.stringify(entity);
        // return buffer
        let bufferSize = lengthBytesUTF8(entityString) + 1;
        let buffer = _malloc(bufferSize);
        stringToUTF8(entityString, buffer, bufferSize);

        dynCall_vi(cb, buffer);
      }
    );

    client.__destroy_into_raw();
    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEventMessageSubscription: async function (clientPtr, subPtr, clauseStr) {
    let client = wasm_bindgen.ToriiClient.__wrap(clientPtr);
    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = UTF8ToString(clauseStr);

    await client.updateEventMessageSubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);

    client.__destroy_into_raw();
    subscription.__destroy_into_raw();
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
    const id = await client.publishMessage({
      message: UTF8ToString(message),
      signature: JSON.parse(UTF8ToString(signature)),
    });
    const bufferSize = lengthBytesUTF8(id) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(id, buffer, bufferSize);

    client.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
});