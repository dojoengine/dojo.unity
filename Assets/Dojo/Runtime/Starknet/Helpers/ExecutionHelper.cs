using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dojo.Starknet;
using dojo_bindings;

namespace Starknet {
    public struct Call {
        public FieldElement contractAddress;
        public string selector;
        public FieldElement[] calldata;

        public Call(FieldElement contractAddress, string selector, params FieldElement[] calldata) {
            this.contractAddress = contractAddress;
            this.selector = selector;
            this.calldata = calldata;
        }
    }

    // A helper class for constructing and executing Starknet transactions.
    public class ExecutionHelper {
        public Account account { get; }
        private List<Call> calls;

        public ExecutionHelper(Account account) {
            this.account = account;
            calls = new List<Call>();
        }

        public ExecutionHelper AddCall(Call call) {
            calls.Add(call);
            return this;
        }

        public ExecutionHelper AddCall(FieldElement contractAddress, string selector, params FieldElement[] calldata) {
            var call = new Call(contractAddress, selector, calldata);
            return AddCall(call);
        }

        public async Task<FieldElement> Execute() {
            return await account.ExecuteRaw(calls.Select(call => new dojo.Call {
                to = call.contractAddress.Inner,
                selector = call.selector,
                calldata = call.calldata.Select(field => field.Inner).ToArray()
            }).ToArray());
        }
    }
}