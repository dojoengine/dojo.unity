mergeInto(LibraryManager.library, {
    NewProvider: function (rpcUrl) {
        return wasm_bindgen.createProvider(UTF8ToString(rpcUrl)).__destroy_into_raw();
    },
    NewAccount: async function (providerPtr, pk, address, cb) {
        const provider = wasm_bindgen.Provider.__wrap(providerPtr);
        const account = await provider.createAccount(UTF8ToString(pk), UTF8ToString(address));

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
    AccountDeployBurner: async function (accountPtr, cb) {
        const account = wasm_bindgen.Account.__wrap(accountPtr);
        const burner = await account.deployBurner();

        account.__destroy_into_raw();
        dynCall_vi(cb, burner.__destroy_into_raw());
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
        var pk = wasm_bindgen.signingKeyNew();
        var bufferSize = lengthBytesUTF8(pk) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(pk, buffer, bufferSize);
        return buffer;
    },
    Sign: function (pk, hash) {
        var signature = wasm_bindgen.signingKeySign(UTF8ToString(pk), UTF8ToString(hash));
        var compactSig = signature.r.replace('0x', '').padStart(64, '0') + signature.s.replace('0x', '').padStart(64, '0');
        console.log(signature);
        console.log(compactSig);
        var bufferSize = lengthBytesUTF8(compactSig) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(compactSig, buffer, bufferSize);
        return buffer;
    },
    NewVerifyingKey: function (pk) {
        var verifyingKey = wasm_bindgen.verifyingKeyNew(UTF8ToString(pk));
        var bufferSize = lengthBytesUTF8(verifyingKey) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(verifyingKey, buffer, bufferSize);
        return buffer;
    },
    Verify: function (vk, hash, r, s) {
        return wasm_bindgen.verifyingKeyVerify(UTF8ToString(vk), UTF8ToString(hash), {
            r: UTF8ToString(r),
            s: UTF8ToString(s)
        });
    },
});