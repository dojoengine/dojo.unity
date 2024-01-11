mergeInto(LibraryManager.library, {
    GetPublicKey: function (privateKey) {
        var starkKey = stark.ec.starkCurve.getStarkKey(UTF8ToString(privateKey));

        var bufferSize = lengthBytesUTF8(starkKey) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(starkKey, buffer, bufferSize);
        return buffer;
    },
    Sign: function (msgHash, privateKey) {
        var signature = stark.ec.starkCurve.sign(UTF8ToString(msgHash), UTF8ToString(privateKey));

        var signatureCompact = signature.toCompactHex();
        var bufferSize = lengthBytesUTF8(signatureCompact) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(signatureCompact, buffer, bufferSize);
        return buffer;

    },
    Verify: function (signatureCompact, msgHash, publicKey) {
        const Fp = stark.ec.starkCurve.Fp251;
        // if public key is starkkey, x coordinate of curve
        const x = stark.num.toBigInt(UTF8ToString(publicKey));
        // weierstrass equation
        const { a, b } = stark.ec.starkCurve._starkCurve.CURVE;
        const x2 = Fp.sqr(x);
        const x3 = Fp.mul(x2, x);
        // squared y
        const y2 = Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
        // we get the y
        const y = Fp.sqrt(y2);
        // we get the point
        const point = stark.ec.starkCurve._starkCurve.ProjectivePoint.fromAffine({
            x,
            y,
        });
        
        var signature = stark.ec.starkCurve.Signature.fromCompact(UTF8ToString(signatureCompact));
        var result = stark.ec.starkCurve.verify(signature, UTF8ToString(msgHash), point.toRawBytes());
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
        dynCall_vi(cb);
    },
    NewAccount: function (providerStr, address, privateKey) {
        var provider = new stark.RpcProvider(JSON.parse(UTF8ToString(providerStr)));
        var account = new stark.Account(provider, UTF8ToString(address), UTF8ToString(privateKey));

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
    AccountExecuteRaw: async function (accountStr, calls, cb) {
        var accountObject = JSON.parse(UTF8ToString(accountStr));
        var account = new stark.Account(new stark.RpcProvider(accountObject.provider), accountObject.address, new stark.Signer(accountObject.signer.pk));

        var calls = JSON.parse(UTF8ToString(calls));
        var txHash = await account.execute(calls.map((c) => ({
            ...c,
            calldata: stark.CallData.compile(c.calldata)
        })));

        var txString = txHash.transaction_hash;
        var bufferSize = lengthBytesUTF8(txString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(txString, buffer, bufferSize);
        dynCall_vi(cb, buffer);
    },
    AccountDeployBurner: async function (accountStr, cb) {
        var accountObject = JSON.parse(UTF8ToString(accountStr));
        var account = new stark.Account(new stark.RpcProvider(accountObject.provider), accountObject.address, accountObject.signer.pk);

        // new random private key
        const pk = stark.stark.randomAddress();
        const publicKey = stark.ec.starkCurve.getStarkKey(pk);
        var deployData = await account.deployContract({
            classHash: "0x04d07e40e93398ed3c76981e72dd1fd22557a78ce36c0515f679e27f0bb5bc5f",
            salt: publicKey,
            unique: false,
            constructorCalldata: stark.CallData.compile({publicKey}),
        });

        var accountString = JSON.stringify(new stark.Account(new stark.RpcProvider(accountObject.provider), deployData.contract_address, pk));
        var bufferSize = lengthBytesUTF8(accountString) + 1;
        var buffer = _malloc(bufferSize);
        stringToUTF8(accountString, buffer, bufferSize);
        dynCall_vi(cb, buffer);

    },
});