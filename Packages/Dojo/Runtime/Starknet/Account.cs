using System;
using bottlenoselabs.C2CS.Runtime;
using dojo_bindings;

// A managed type for the Ty structure
// Frees the underlying dojo.Ty when the object is garbage collected
public unsafe class Account
{
    private dojo.Account* account;
        
    public Account(string rpcUrl, string privateKey, string address)
    {
        dojo.Error error;
        var felt = dojo.felt_from_hex_be(CString.FromString(privateKey), &error);
        if (error.message != string.Empty)
        {
            throw new Exception(error.message);
        }
        
        account = dojo.account_new(CString.FromString(rpcUrl), felt,
            CString.FromString(address), &error);
        if (account == null)
        {
            throw new Exception(error.message);
        }
    }
        
    ~Account()
    {
        dojo.account_free(account);
    }
        
    public dojo.FieldElement Address()
    {
        dojo.FieldElement address = dojo.account_address(account);
            
        return address;
    }
        
    public dojo.FieldElement ChainId()
    {
        dojo.FieldElement chainId = dojo.account_chain_id(account);
            
        return chainId;
    }
        
    public void SetBlockId(dojo.BlockId blockId)
    {
        dojo.account_set_block_id(account, blockId);
    }

    public void ExecuteRaw(dojo.Call[] calls)
    {
        dojo.Call* callsPtr;
        fixed (dojo.Call* ptr = &calls[0])
        {
            callsPtr = ptr;
        }

        dojo.Error error;
        dojo.account_execute_raw(account, callsPtr, (nuint) calls.Length, &error);
        if (error.message != string.Empty)
        {
            throw new Exception(error.message);
        }
    }
}