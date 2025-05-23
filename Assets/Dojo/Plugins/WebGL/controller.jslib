mergeInto(LibraryManager.library, {
  NewController: function (rpcUrl, chainId, policies) {
    const rpcUrl = UTF8ToString(rpcUrl);
    const chainId = UTF8ToString(chainId);
    const policies = JSON.parse(UTF8ToString(policies));

    const opts = {
      chains: [
        { rpcUrl }
      ],
      defaultChainId: chainId,
      policies: policies.reduce((acc, policy) => {
        if (!acc[policy.target]) {
          // If target doesn't exist, initialize it
          acc[policy.target] = {
            methods: [],
            description: policy.description // Use description from the first policy encountered
          };
        }
        // Append methods from the current policy to the target's methods array
        acc[policy.target].methods.push(policy.method);
        return acc;
      }, {})
    }

    window.controllerProvider = new ControllerProvider(opts)
  },
  Probe: function (cb) {
    window.controllerProvider.probe().then((account) => {
      dynCall_vi(cb, account ? true : false)
    })
  },
  Connect: function (cb) {
    window.controllerProvider.connect().then((account) => {
      dynCall_vi(cb, account ? true : false)
    })
  },
  Disconnect: function (cb) {
    window.controllerProvider.disconnect().then(() => {
      dynCall_vi(cb)
    })
  },
  Execute: function (cb, calls) {
    window.controllerProvider.account.execute(JSON.parse(UTF8ToString(calls))).then((result) => {
      dynCall_vi(cb, result.transaction_hash)
    })
  }
});
