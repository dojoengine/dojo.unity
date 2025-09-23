mergeInto(LibraryManager.library, {
  // Creates a new client and returns the client ID
  CreateClient: async function (
    toriiUrl,
    worldAddress,
    cb
  ) {
    if (!window.toriiClients) {
      window.toriiClients = {};
    }
    
    let client = await (new wasm_bindgen.ToriiClient({
      toriiUrl: UTF8ToString(toriiUrl),
      worldAddress: UTF8ToString(worldAddress),
    }));

    const clientId = Math.floor(Math.random() * 1000000);
    window.toriiClients[clientId] = client;
    
    dynCall_vi(cb, clientId);
  },

  // Destroy a client and remove it from the registry
  DestroyClient: function(clientId) {
    const client = window.toriiClients[clientId];
    if (client) {
      client.__destroy_into_raw();
      delete window.toriiClients[clientId];
    }
  },
  // Returns a page of all controllers
  GetControllers: async function (clientId, queryString, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('GetControllers: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const query = JSON.parse(UTF8ToString(queryString));
    const controllersPage = await client.getControllers(query);

    const controllersPageString = JSON.stringify(controllersPage);
    const bufferSize = lengthBytesUTF8(controllersPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(controllersPageString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  // Returns a page of all tokens
  GetTokens: async function (clientId, queryString, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('GetTokens: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const query = JSON.parse(UTF8ToString(queryString));
    const tokensPage = await client.getTokens(query);

    const tokensPageString = JSON.stringify(tokensPage);
    const bufferSize = lengthBytesUTF8(tokensPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(tokensPageString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  // Returns a page of all token balances
  GetTokenBalances: async function (clientId, queryString, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('GetTokenBalances: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const query = JSON.parse(UTF8ToString(queryString));
    const balancesPage = await client.getTokenBalances(query);

    const balancesPageString = JSON.stringify(balancesPage);
    const bufferSize = lengthBytesUTF8(balancesPageString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(balancesPageString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the entities
  GetEntities: async function (clientId, queryString, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('GetEntities: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const query = JSON.parse(UTF8ToString(queryString));
    let entitiesPage = await client.getEntities(query);

    // stringify the entities page
    let entitiesPageString = JSON.stringify(entitiesPage);
    // return buffer
    let bufferSize = lengthBytesUTF8(entitiesPageString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(entitiesPageString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  // Returns a dictionary of all of the eventmessages
  GetEventMessages: async function (clientId, queryString, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('GetEventMessages: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const query = JSON.parse(UTF8ToString(queryString));
    let eventMessagesPage = await client.getEventMessages(query);

    // stringify the event messages page
    let eventMessagesPageString = JSON.stringify(eventMessagesPage);
    // return buffer
    let bufferSize = lengthBytesUTF8(eventMessagesPageString) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(eventMessagesPageString, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  OnTokenUpdated: async function (clientId, contractAddresses, tokenIds, cb, subCb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('OnTokenUpdated: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const subscription = await client.onTokenUpdated(
      JSON.parse(UTF8ToString(contractAddresses)),
      JSON.parse(UTF8ToString(tokenIds)),
      (token) => {
        const tokenString = JSON.stringify(token);
        const bufferSize = lengthBytesUTF8(tokenString) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(tokenString, buffer, bufferSize);

        dynCall_vi(cb, buffer);
      }
    );

    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  OnTokenBalanceUpdated: async function (clientId, contractAddresses, accountAddresses, tokenIds, cb, subCb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('OnTokenBalanceUpdated: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const subscription = await client.onTokenBalanceUpdated(
      JSON.parse(UTF8ToString(contractAddresses)),
      JSON.parse(UTF8ToString(accountAddresses)),
      JSON.parse(UTF8ToString(tokenIds)),
      (balance) => {
        const balanceString = JSON.stringify(balance);
        const bufferSize = lengthBytesUTF8(balanceString) + 1;
        const buffer = _malloc(bufferSize);
        stringToUTF8(balanceString, buffer, bufferSize);

        dynCall_vi(cb, buffer);
      }
    );

    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  OnEntityUpdated: async function (clientId, clauseStr, cb, subCb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('OnEntityUpdated: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

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

    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEntitySubscription: async function (clientId, subPtr, clauseStr) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('UpdateEntitySubscription: Client not found for ID:', clientId);
      return;
    }

    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = UTF8ToString(clauseStr);

    await client.updateEntitySubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);

    subscription.__destroy_into_raw();
  },
  OnEventMessageUpdated: async function (clientId, clauseStr, cb, subCb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('OnEventMessageUpdated: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

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

    dynCall_vi(subCb, subscription.__destroy_into_raw());
  },
  UpdateEventMessageSubscription: async function (clientId, subPtr, clauseStr) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('UpdateEventMessageSubscription: Client not found for ID:', clientId);
      return;
    }

    let subscription = wasm_bindgen.Subscription.__wrap(subPtr);
    let clause = UTF8ToString(clauseStr);

    await client.updateEventMessageSubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);

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
  PublishMessage: async function (clientId, message, signature, cb) {
    const client = window.toriiClients[clientId];
    if (!client) {
      console.error('PublishMessage: Client not found for ID:', clientId);
      dynCall_vi(cb, 0);
      return;
    }

    const id = await client.publishMessage({
      message: UTF8ToString(message),
      signature: JSON.parse(UTF8ToString(signature)),
    });
    const bufferSize = lengthBytesUTF8(id) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(id, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
});
