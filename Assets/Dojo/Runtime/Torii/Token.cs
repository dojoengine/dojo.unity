using System.Collections.Generic;
using System.Numerics;
using Dojo.Starknet;
using dojo_bindings;
using Newtonsoft.Json;

namespace Dojo.Torii
{
    public struct Token
    {
        public FieldElement contractAddress;
        public BigInteger? tokenId;
        public string name;
        public string symbol;
        public int decimals;
        public Dictionary<string, object> metadata;
        public BigInteger? totalSupply;

        public Token(FieldElement contractAddress, BigInteger? tokenId, string name, string symbol, int decimals, Dictionary<string, object> metadata, BigInteger? totalSupply)
        {
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
            this.name = name;
            this.symbol = symbol;
            this.decimals = decimals;
            this.metadata = metadata;
            this.totalSupply = totalSupply;
        }

        public Token(dojo.Token token)
        {
            this.contractAddress = new FieldElement(token.contract_address);
            this.tokenId = token.token_id.tag == dojo.COptionU256_Tag.SomeU256 ? new BigInteger(token.token_id.some.data, false, true) : null;
            this.name = token.name;
            this.symbol = token.symbol;
            this.decimals = token.decimals;
            this.metadata = JsonConvert.DeserializeObject<Dictionary<string, object>>(token.metadata);
            this.totalSupply = token.total_supply.tag == dojo.COptionU256_Tag.SomeU256 ? new BigInteger(token.total_supply.some.data, false, true) : null;
        }
    }

    public struct TokenBalance
    {
        public BigInteger balance;
        public FieldElement accountAddress;
        public FieldElement contractAddress;
        public BigInteger? tokenId;

        public TokenBalance(BigInteger balance, FieldElement accountAddress, FieldElement contractAddress, BigInteger? tokenId)
        {
            this.balance = balance;
            this.accountAddress = accountAddress;
            this.contractAddress = contractAddress;
            this.tokenId = tokenId;
        }

        public TokenBalance(dojo.TokenBalance tokenBalance)
        {
            this.balance = new BigInteger(tokenBalance.balance.data, false, true);
            this.accountAddress = new FieldElement(tokenBalance.account_address);
            this.contractAddress = new FieldElement(tokenBalance.contract_address);
            this.tokenId = tokenBalance.token_id.tag == dojo.COptionU256_Tag.SomeU256 ? new BigInteger(tokenBalance.token_id.some.data, false, true) : null;
        }
    }
}
