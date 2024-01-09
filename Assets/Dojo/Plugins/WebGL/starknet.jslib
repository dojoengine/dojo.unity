mergeInto(LibraryManager.library, {
    GetStarkKey: function (privateKey) {
        var starkKey = stark.ec.starkCurve.getStarkKey(UTF8ToString(privateKey));

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
    Verify: function (signature, msgHash, publicKey) {
        var signatureObject = JSON.parse(UTF8ToString(signature));
        var result = stark.ec.starkCurve.verify(UTF8ToString(msgHash), signatureObject, UTF8ToString(publicKey));
        return result;
    },
    NewRpcProvider: function (nodeUrl) {
        var provider = new stark.RpcProvider({
            nodeUrl: UTF8ToString(nodeUrl)
        });

        return __retain(__wrap(provider));
    }
});