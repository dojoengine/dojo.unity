mergeInto(LibraryManager.library, {
    GetPublicKey: function (privateKey) {
        var starkKey = stark.ec.starkCurve.getPublicKey(UTF8ToString(privateKey));

        var bufferSize = lengthBytesUTF8(starkKey) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(starkKey, buffer, bufferSize);
        return buffer;
    },
    Sign: function (msgHash, privateKey) {
        var signature = stark.ec.starkCurve.sign(UTF8ToString(msgHash), UTF8ToString(privateKey));

        var signatureString = JSON.stringify(signature);
        var bufferSize = lengthBytesUTF8(signatureString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(signatureString, buffer, bufferSize);
        return buffer;

    },
    Verify: function (signatureCompactHex, msgHash, publicKey) {
        var signatureObject = stark.ec.starkCurve.Signature.fromCompact(UTF8ToString(signature));
        var result = stark.ec.starkCurve.verify(UTF8ToString(msgHash), signatureObject, UTF8ToString(publicKey));
        return result;
    },
    NewRpcProvider: function (nodeUrl) {
        var provider = new stark.RpcProvider({
            nodeUrl: UTF8ToString(nodeUrl)
        });

        var providerString = JSON.stringify(provider);
        var bufferSize = lengthBytesUTF8(providerString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(providerString, buffer, bufferSize);
        return buffer;
    },
    WaitForTransaction: async function (providerStr, txHash, cb) {
        var provider = JSON.parse(UTF8ToString(providerStr));
        var tx = await provider.waitForTransaction(UTF8ToString(txHash));

        var txString = JSON.stringify(tx);
        var bufferSize = lengthBytesUTF8(txString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(txString, buffer, bufferSize);
        dynCall_vi(cb, txString);
    },
    NewAccount: function (providerStr, address, privateKey) {
        var provider = JSON.parse(UTF8ToString(providerStr));
        var account = new stark.Account(providerObject, UTF8ToString(address), UTF8ToString(privateKey));

        var accountString = JSON.stringify(account);
        var bufferSize = lengthBytesUTF8(accountString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(accountString, buffer, bufferSize);
        return buffer;
    },
    AccountAddress: function (accountStr) {
        var account = JSON.parse(UTF8ToString(accountStr));
        var address = account.address;

        var bufferSize = lengthBytesUTF8(address) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(address, buffer, bufferSize);
        return buffer;
    },
    AccountChainId: function (accountStr) {
        var account = JSON.parse(UTF8ToString(accountStr));
        var chainId = account.chainId;

        var bufferSize = lengthBytesUTF8(chainId) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(chainId, buffer, bufferSize);
        return buffer;
    },
    AccountExecuteRaw: async function (accountStr, contractAddress, entrypoint, calldata, cb) {
        var accountObject = JSON.parse(UTF8ToString(accountStr));
        var account = new stark.Account(new stark.RpcProvider(accountObject.provider), accountObject.address, accountObject.signer);

        var txHash = await account.execute({
            contractAddress: UTF8ToString(contractAddress),
            entrypoint: UTF8ToString(entrypoint),
            calldata: JSON.parse(UTF8ToString(calldata))
        });
        await account.provider.waitForTransaction(txHash);

        var txString = txHash.transaction_hash;
        var bufferSize = lengthBytesUTF8(txString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(txString, buffer, bufferSize);
        dynCall_vi(cb, txString);
    },
});