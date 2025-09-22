mergeInto(LibraryManager.library, {
  // Global objects to store provider and account instances
  starknetProviders: {},
  starknetAccounts: {},
  nextProviderId: 1,
  nextAccountId: 1,
  NewProvider: function (rpcUrl) {
    let provider = new wasm_bindgen.Provider(UTF8ToString(rpcUrl));
    
    // Store provider in global object and return virtual pointer
    let providerId = this.nextProviderId++;
    this.starknetProviders[providerId] = provider;
    return providerId;
  },
  NewAccount: async function (providerPtr, pk, address, cb) {
    const provider = this.starknetProviders[providerPtr];
    if (!provider) {
      console.error('Provider not found for ID:', providerPtr);
      return;
    }
    
    const account = await (new wasm_bindgen.Account(
      provider,
      UTF8ToString(pk),
      UTF8ToString(address)
    ));

    // Store account in global object and return virtual pointer
    let accountId = this.nextAccountId++;
    this.starknetAccounts[accountId] = account;
    dynCall_vi(cb, accountId);
  },
  AccountAddress: function (accountPtr) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return null;
    }
    
    const address = account.address();
    const bufferSize = lengthBytesUTF8(address) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(address, buffer, bufferSize);

    return buffer;
  },
  AccountChainId: function (accountPtr) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return null;
    }
    
    const chainId = account.chainId();
    const bufferSize = lengthBytesUTF8(chainId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(chainId, buffer, bufferSize);

    return buffer;
  },
  AccountSetBlockId: function (accountPtr, blockId) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return;
    }

    account.setBlockId(UTF8ToString(blockId));
  },
  AccountExecuteRaw: async function (accountPtr, callsStr, cb) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return;
    }
    
    const calls = JSON.parse(UTF8ToString(callsStr));
    const txHash = await account.executeRaw(calls);
    const bufferSize = lengthBytesUTF8(txHash) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(txHash, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  AccountDeployBurner: async function (accountPtr, privateKey, cb) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return;
    }
    
    const burner = await account.deployBurner(UTF8ToString(privateKey));

    // Store burner account in global object and return virtual pointer
    let burnerId = this.nextAccountId++;
    this.starknetAccounts[burnerId] = burner;
    dynCall_vi(cb, burnerId);
  },
  AccountNonce: async function (accountPtr, cb) {
    const account = this.starknetAccounts[accountPtr];
    if (!account) {
      console.error('Account not found for ID:', accountPtr);
      return;
    }
    
    const nonce = await account.nonce();
    const bufferSize = lengthBytesUTF8(nonce) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(nonce, buffer, bufferSize);
    
    dynCall_vi(cb, buffer);
  },
  Call: async function (providerPtr, callStr, blockIdStr, cb) {
    const provider = this.starknetProviders[providerPtr];
    if (!provider) {
      console.error('Provider not found for ID:', providerPtr);
      return;
    }
    
    const call = JSON.parse(UTF8ToString(callStr));
    const blockId = JSON.parse(UTF8ToString(blockIdStr));
    const result = await provider.call(call, blockId);
    const bufferSize = lengthBytesUTF8(result) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(result, buffer, bufferSize);

    dynCall_vi(cb, buffer);
  },
  WaitForTransaction: async function (providerPtr, txHash, cb) {
    const provider = this.starknetProviders[providerPtr];
    if (!provider) {
      console.error('Provider not found for ID:', providerPtr);
      return;
    }
    
    const confirmed = await provider.waitForTransaction(UTF8ToString(txHash));

    dynCall_vi(cb, confirmed);
  },
  RandomSigningKey: function () {
    let pk = wasm_bindgen.SigningKey.fromRandom().secretScalar();
    let bufferSize = lengthBytesUTF8(pk) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(pk, buffer, bufferSize);
    return buffer;
  },
  Sign: function (pk, hash) {
    let signingKey = wasm_bindgen.SigningKey.fromSecretScalar(UTF8ToString(pk));
    let signature = signingKey.sign(UTF8ToString(hash));
    let compactSig =
      signature.r.replace("0x", "").padStart(64, "0") +
      signature.s.replace("0x", "").padStart(64, "0");
    let bufferSize = lengthBytesUTF8(compactSig) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(compactSig, buffer, bufferSize);
    return buffer;
  },
  DeriveVerifyingKey: function (pk) {
    let signingKey = new wasm_bindgen.SigningKey(UTF8ToString(pk));
    let verifyingKey = signingKey.verifyingKey().scalar();
    let bufferSize = lengthBytesUTF8(verifyingKey) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(verifyingKey, buffer, bufferSize);
    return buffer;
  },
  NewVerifyingKey: function (vk) {
    let verifyingKey = new wasm_bindgen.VerifyingKey(UTF8ToString(vk)).scalar();
    let bufferSize = lengthBytesUTF8(verifyingKey) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(verifyingKey, buffer, bufferSize);
    return buffer;
  },
  Verify: function (vk, hash, r, s) {
    let verifyingKey = new wasm_bindgen.VerifyingKey(UTF8ToString(vk));
    return verifyingKey.verify(
      UTF8ToString(hash),
      {
        r: UTF8ToString(r),
        s: UTF8ToString(s),
      }
    );
  },
  SerializeByteArray: function (byteArrayStr) {
    const felts = new wasm_bindgen.ByteArray(UTF8ToString(byteArrayStr)).toRaw();
    const feltsString = JSON.stringify(felts);
    const bufferSize = lengthBytesUTF8(feltsString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(feltsString, buffer, bufferSize);
    return buffer;
  },
  DeserializeByteArray: function (feltsStr) {
    const felts = JSON.parse(UTF8ToString(feltsStr));
    const byteArray = wasm_bindgen.ByteArray.fromRaw(felts);
    const bufferSize = lengthBytesUTF8(byteArray) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(byteArray, buffer, bufferSize);
    return buffer;
  },
  PoseidonHash: function (str) {
    const felts = JSON.parse(UTF8ToString(str));
    const hash = wasm_bindgen.poseidonHash(felts);
    const bufferSize = lengthBytesUTF8(hash) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(hash, buffer, bufferSize);
    return buffer;
  },
  // Cleanup function to dispose of a provider
  DisposeProvider: function (providerPtr) {
    if (this.starknetProviders[providerPtr]) {
      delete this.starknetProviders[providerPtr];
    }
  },
  // Cleanup function to dispose of an account
  DisposeAccount: function (accountPtr) {
    if (this.starknetAccounts[accountPtr]) {
      delete this.starknetAccounts[accountPtr];
    }
  },
});
