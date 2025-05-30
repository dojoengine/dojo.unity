using System.Collections.Generic;
using System.Threading.Tasks;

namespace Dojo.Starknet
{

    // A helper class for constructing and executing Starknet transactions.
    public class ExecutionHelper
    {
        public Account account { get; }
        private List<Call> calls;

        public ExecutionHelper(Account account)
        {
            this.account = account;
            calls = new List<Call>();
        }

        public ExecutionHelper AddCall(Call call)
        {
            calls.Add(call);
            return this;
        }

        public ExecutionHelper AddCall(FieldElement contractAddress, string selector, params FieldElement[] calldata)
        {
            var call = new Call(contractAddress, selector, calldata);
            return AddCall(call);
        }

        public async Task<FieldElement> Execute()
        {
            return await account.ExecuteRaw(calls.ToArray());
        }
    }
}