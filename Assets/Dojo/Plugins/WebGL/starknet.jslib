mergeInto(LibraryManager.library, {
    NewProvider: function (rpcUrl) {
        return wasm_bindgen.jsonrpcClientNew(UTF8ToString(rpcUrl));
    },
    NewAccount: async function (provider, pk, address, cb) {
        const account = await wasm_bindgen.accountNew(provider, UTF8ToString(pk), UTF8ToString(address));
        dynCall_vi(cb, account);
    },
    AccountAddress: function (account) {
        var address = wasm_bindgen.accountAddress(account);
        var bufferSize = lengthBytesUTF8(address) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(address, buffer, bufferSize);
        return buffer;
    },
    AccountChainId: function (account) {
        var chainId = wasm_bindgen.accountChainId(account);
        var bufferSize = lengthBytesUTF8(chainId) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(chainId, buffer, bufferSize);
        return buffer;
    },
    AccountSetBlockId: function (account, blockId) {
        wasm_bindgen.accountSetBlockId(account, UTF8ToString(blockId));
    },
    AccountExecuteRaw: async function (account, calls, cb) {
        var calls = JSON.parse(UTF8ToString(calls));
        var txHash = await wasm_bindgen.accountExecuteRaw(account, {
            calls
        });
        var bufferSize = lengthBytesUTF8(txHash) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(txHash, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    },
    AccountDeployBurner: async function (account, cb) {
        const burner = await wasm_bindgen.accountDeployBurner(account);
        dynCall_vi(cb, burner);
    },
    WaitForTransaction: async function (provider, txHash, cb) {
        const confirmed = await wasm_bindgen.waitForTransaction(provider, UTF8ToString(txHash));
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