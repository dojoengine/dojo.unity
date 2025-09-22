// Global objects to store client instances and subscriptions
var toriiClients = {};
var toriiSubscriptions = {};
var nextClientId = 1;
var nextSubscriptionId = 1;

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

    // Store client in global object and return virtual pointer
    let clientId = nextClientId++;
    toriiClients[clientId] = client;
    dynCall_vi(cb, clientId);
  },
  // Returns a page of all controllers
  GetControllers: async function (clientPtr, queryString, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  GetTokens: async function (clientPtr, queryString, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  GetTokenBalances: async function (clientPtr, queryString, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  GetEntities: async function (clientPtr, queryString, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  GetEventMessages: async function (clientPtr, queryString, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  // Get the value of a model for a specific set of keys
  GetModelValue: async function (clientPtr, model, keys, cb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    
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

    dynCall_vi(cb, buffer);
  },
  OnTokenUpdated: async function (clientPtr, contractAddresses, tokenIds, cb, subCb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
      });

    // Store subscription in global object and return virtual pointer
    let subscriptionId = nextSubscriptionId++;
    toriiSubscriptions[subscriptionId] = subscription;
    dynCall_vi(subCb, subscriptionId);
  },
  OnTokenBalanceUpdated: async function (clientPtr, contractAddresses, accountAddresses, tokenIds, cb, subCb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
      });

    // Store subscription in global object and return virtual pointer
    let subscriptionId = nextSubscriptionId++;
    toriiSubscriptions[subscriptionId] = subscription;
    dynCall_vi(subCb, subscriptionId);
  },
  OnEntityUpdated: async function (clientPtr, clauseStr, cb, subCb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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

    // Store subscription in global object and return virtual pointer
    let subscriptionId = nextSubscriptionId++;
    toriiSubscriptions[subscriptionId] = subscription;
    dynCall_vi(subCb, subscriptionId);
  },
  UpdateEntitySubscription: async function (clientPtr, subPtr, clauseStr) {
    const client = toriiClients[clientPtr];
    const subscription = toriiSubscriptions[subPtr];
    
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    if (!subscription) {
      console.error('Subscription not found for ID:', subPtr);
      return;
    }
    
    let clause = UTF8ToString(clauseStr);
    await client.updateEntitySubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);
  },
  OnEventMessageUpdated: async function (clientPtr, clauseStr, cb, subCb) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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

    // Store subscription in global object and return virtual pointer
    let subscriptionId = nextSubscriptionId++;
    toriiSubscriptions[subscriptionId] = subscription;
    dynCall_vi(subCb, subscriptionId);
  },
  UpdateEventMessageSubscription: async function (clientPtr, subPtr, clauseStr) {
    const client = toriiClients[clientPtr];
    const subscription = toriiSubscriptions[subPtr];
    
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    if (!subscription) {
      console.error('Subscription not found for ID:', subPtr);
      return;
    }
    
    let clause = UTF8ToString(clauseStr);
    await client.updateEventMessageSubscription(subscription, clause !== "" ? JSON.parse(clause) : undefined);
  },
  AddModelsToSync: function (clientPtr, models) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    client.addModelsToSync(modelsArray);
  },
  RemoveModelsToSync: function (clientPtr, models) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    client.removeModelsToSync(modelsArray);
  },
  OnSyncModelChange: async function (
    clientPtr,
    models,
    callbackObjectName,
    callbackMethodName
  ) {
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
      return;
    }
    
    let modelsString = UTF8ToString(models);
    let modelsArray = JSON.parse(modelsString);

    const subscription = await client.onSyncModelChange(modelsArray, () => {
      gameInstance.SendMessage(
        UTF8ToString(callbackObjectName),
        UTF8ToString(callbackMethodName)
      );
    });
    
    // Store subscription in global object (no need to return ID since it's not used elsewhere)
    let subscriptionId = nextSubscriptionId++;
    toriiSubscriptions[subscriptionId] = subscription;
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
    const client = toriiClients[clientPtr];
    if (!client) {
      console.error('Client not found for ID:', clientPtr);
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
  // Cleanup function to dispose of a client and all its subscriptions
  DisposeClient: function (clientPtr) {
    if (toriiClients[clientPtr]) {
      delete toriiClients[clientPtr];
    }
  },
  // Cleanup function to dispose of a subscription
  DisposeSubscription: function (subPtr) {
    if (toriiSubscriptions[subPtr]) {
      delete toriiSubscriptions[subPtr];
    }
  },
});
