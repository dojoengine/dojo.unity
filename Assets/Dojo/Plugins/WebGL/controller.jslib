mergeInto(LibraryManager.library, {
  ControllerProbe: function (cb) {
    window.starknet_controller.probe().then((account) => {
      dynCall_vi(cb, account ? true : false);
    });
  },
  ControllerConnect: async function (rpcUrl, policies, chainId, cb) {
    rpcUrl = UTF8ToString(rpcUrl);
    chainId = UTF8ToString(chainId);
    // chain id  is optional
    if (chainId == "") {
      const provider = new wasm_bindgen.Provider(rpcUrl);
      chainId = await provider.chainId();
    }
    policies = JSON.parse(UTF8ToString(policies));

    const opts = {
      chains: [{ rpcUrl }],
      defaultChainId: chainId,
      policies: {
        contracts: policies.reduce((acc, policy) => {
          if (!acc[policy.target]) {
            // If target doesn't exist, initialize it
            acc[policy.target] = {
              methods: [],
              name: 'Unity Game',
              description: 'Unity game actions',
            };
          }
          // Append methods from the current policy to the target's methods array
          acc[policy.target].methods.push({
            entrypoint: policy.method,
            description: policy.description,
          });
          return acc;
        }, {}),
      },
    };

    console.log(opts);

    const controller = new ControllerProvider(opts);
    controller
      .waitForKeychain()
      .then(() => controller.connect())
      .then((account) => {
        dynCall_vi(cb, account ? true : false);
      })
      .catch((error) => {
        dynCall_vi(cb, false);
      });
  },
  ControllerDisconnect: function (cb) {
    window.starknet_controller.disconnect().then(() => {
      dynCall_vi(cb);
    });
  },
  ControllerExecute: function (cb, calls) {
    calls = JSON.parse(UTF8ToString(calls));
    window.starknet_controller.account.execute(calls).then((result) => {
      console.log(result);
      const bufferSize = lengthBytesUTF8(result.transaction_hash) + 1;
      const buffer = _malloc(bufferSize);
      stringToUTF8(result.transaction_hash, buffer, bufferSize);
      dynCall_vi(cb, buffer);
    }).catch((error) => {
      console.error(error);
      const bufferSize = lengthBytesUTF8(error.message) + 1;
      const buffer = _malloc(bufferSize);
      stringToUTF8(error.message, buffer, bufferSize);
      dynCall_vi(cb, buffer);
    });
  },
  ControllerAddress: function () {
    const address = window.starknet_controller.account.address;
    const bufferSize = lengthBytesUTF8(address) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(address, buffer, bufferSize);
    return buffer;
  },
  ControllerUsername: async function (cb) {
    const username = await window.starknet_controller.username();
    const bufferSize = lengthBytesUTF8(username) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(username, buffer, bufferSize);
    dynCall_vi(cb, buffer);
  },
  ControllerChainId: async function (cb) {
    const chainId = await window.starknet_controller.account.chainId();
    const bufferSize = lengthBytesUTF8(chainId) + 1;
    const buffer = _malloc(bufferSize);
    stringToUTF8(chainId, buffer, bufferSize);
    dynCall_vi(cb, buffer);
  },
});
