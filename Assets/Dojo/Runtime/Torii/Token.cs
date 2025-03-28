using System.Collections.Generic;
using System.Numerics;
using Dojo.Starknet;

namespace Dojo.Torii
{
    public struct Token
    {
        public FieldElement contractAddress;
        public BigInteger tokenId;
        public string name;
        public string symbol;
        public int decimals;
        public Dictionary<string, object> metadata;

        public Token(FieldElement contractAddress, BigInteger tokenId, string name, string symbol, int decimals, Dictionary<string, object> metadata)
        {
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
            this.name = name;
            this.symbol = symbol;
            this.decimals = decimals;
            this.metadata = metadata;
        }
    }

    public struct TokenBalance
    {
        public BigInteger balance;
        public FieldElement accountAddress;
        public FieldElement contractAddress;
        public BigInteger tokenId;

        public TokenBalance(BigInteger balance, FieldElement accountAddress, FieldElement contractAddress, BigInteger tokenId)
        {
            this.balance = balance;
            this.accountAddress = accountAddress;
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
        }
    }
}
