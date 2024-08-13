mergeInto(LibraryManager.library, {
  NewProvider: function (rpcUrl) {
    return wasm_bindgen
      .createProvider(UTF8ToString(rpcUrl))
      .__destroy_into_raw();
  },
  NewAccount: async function (providerPtr, pk, address, cb) {
    const provider = wasm_bindgen.Provider.__wrap(providerPtr);
    const account = await provider.createAccount(
      UTF8ToString(pk),
      UTF8ToString(address)
    );

    provider.__destroy_into_raw();
    dynCall_vi(cb, account.__destroy_into_raw());
  },
  AccountAddress: function (accountPtr) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);
    const address = account.address();
    const bufferSize = lengthBytesUTF8(address) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(address, buffer, bufferSize);

    account.__destroy_into_raw();
    return buffer;
  },
  AccountChainId: function (accountPtr) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);
    const chainId = account.chainId();
    const bufferSize = lengthBytesUTF8(chainId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(chainId, buffer, bufferSize);

    account.__destroy_into_raw();
    return buffer;
  },
  AccountSetBlockId: function (accountPtr, blockId) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);

    account.__destroy_into_raw();
    account.setBlockId(UTF8ToString(blockId));
  },
  AccountExecuteRaw: async function (accountPtr, callsStr, cb) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);
    const calls = JSON.parse(UTF8ToString(callsStr));
    const txHash = await account.executeRaw(calls);
    const bufferSize = lengthBytesUTF8(txHash) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(txHash, buffer, bufferSize);

    account.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  AccountDeployBurner: async function (accountPtr, privateKey, cb) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);
    const burner = await account.deployBurner(UTF8ToString(privateKey));

    account.__destroy_into_raw();
    dynCall_vi(cb, burner.__destroy_into_raw());
  },
  AccountNonce: async function (accountPtr, cb) {
    const account = wasm_bindgen.Account.__wrap(accountPtr);
    const nonce = await account.nonce();
    const bufferSize = lengthBytesUTF8(nonce) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(nonce, buffer, bufferSize);
    
    account.__destroy_into_raw();
    dynCall_vi(cb, buffer);
},
  Call: async function (providerPtr, callStr, blockIdStr, cb) {
    const provider = wasm_bindgen.Provider.__wrap(providerPtr);
    const call = JSON.parse(UTF8ToString(callStr));
    const blockId = JSON.parse(UTF8ToString(blockIdStr));
    const result = await provider.call(call, blockId);
    const bufferSize = lengthBytesUTF8(result) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(result, buffer, bufferSize);

    provider.__destroy_into_raw();
    dynCall_vi(cb, buffer);
  },
  WaitForTransaction: async function (providerPtr, txHash, cb) {
    const provider = wasm_bindgen.Provider.__wrap(providerPtr);
    const confirmed = await provider.waitForTransaction(UTF8ToString(txHash));

    provider.__destroy_into_raw();
    dynCall_vi(cb, confirmed);
  },
  NewSigningKey: function () {
    let pk = wasm_bindgen.signingKeyNew();
    let bufferSize = lengthBytesUTF8(pk) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(pk, buffer, bufferSize);
    return buffer;
  },
  Sign: function (pk, hash) {
    let signature = wasm_bindgen.signingKeySign(
      UTF8ToString(pk),
      UTF8ToString(hash)
    );
    let compactSig =
      signature.r.replace("0x", "").padStart(64, "0") +
      signature.s.replace("0x", "").padStart(64, "0");
    let bufferSize = lengthBytesUTF8(compactSig) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(compactSig, buffer, bufferSize);
    return buffer;
  },
  NewVerifyingKey: function (pk) {
    let verifyingKey = wasm_bindgen.verifyingKeyNew(UTF8ToString(pk));
    let bufferSize = lengthBytesUTF8(verifyingKey) + 1;
    let buffer = _malloc(bufferSize);
    stringToUTF8(verifyingKey, buffer, bufferSize);
    return buffer;
  },
  Verify: function (vk, hash, r, s) {
    return wasm_bindgen.verifyingKeyVerify(
      UTF8ToString(vk),
      UTF8ToString(hash),
      {
        r: UTF8ToString(r),
        s: UTF8ToString(s),
      }
    );
  },
  SerializeByteArray: function (byteArrayStr) {
    const felts = wasm_bindgen.byteArraySerialize(UTF8ToString(byteArrayStr));
    
    const feltsString = JSON.stringify(felts);
    const bufferSize = lengthBytesUTF8(feltsString) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(feltsString, buffer, bufferSize);
    return buffer;
  },
  DeserializeByteArray: function (feltsStr) {
    const felts = JSON.parse(UTF8ToString(feltsStr));
    const byteArray = wasm_bindgen.byteArrayDeserialize(felts);
    const bufferSize = lengthBytesUTF8(byteArray) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(byteArray, buffer, bufferSize);
    return buffer;
  },
  PoseidonHash: function (str) {
    const hash = wasm_bindgen.poseidonHash(UTF8ToString(str));
    const bufferSize = lengthBytesUTF8(hash) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(hash, buffer, bufferSize);
    return buffer;
  }
});
