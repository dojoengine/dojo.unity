// Generated by dojo-bindgen on Tue, 5 Nov 2024 17:50:16 +0000. Do not modify this file manually.
using System;
using System.Threading.Tasks;
using Dojo;
using Dojo.Starknet;
using UnityEngine;
using dojo_bindings;
using System.Collections.Generic;
using System.Linq;
using Enum = Dojo.Starknet.Enum;

// System definitions for `ns-actions` contract
public class Actions : MonoBehaviour {
    // The address of this contract
    public string contractAddress;

    
    // Call the `spawn` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> spawn(Account account) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "spawn",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `move` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> move(Account account, Direction direction) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(new FieldElement(Enum.GetIndex(direction)).Inner);

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "move",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `set_player_config` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> set_player_config(Account account, string name) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.AddRange(ByteArray.Serialize(name).Select(f => f.Inner));

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "set_player_config",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `reset_player_config` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> reset_player_config(Account account) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "reset_player_config",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `set_player_server_profile` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> set_player_server_profile(Account account, uint server_id, string name) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(new FieldElement(server_id).Inner);
		calldata.AddRange(ByteArray.Serialize(name).Select(f => f.Inner));

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "set_player_server_profile",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `set_models` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> set_models(Account account, FieldElement seed, uint n_models) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(seed.Inner);
		calldata.Add(new FieldElement(n_models).Inner);

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "set_models",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `enter_dungeon` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> enter_dungeon(Account account, FieldElement dungeon_address) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(dungeon_address.Inner);

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "enter_dungeon",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `set_test` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> set_test(Account account, ns_Test test) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(new FieldElement(test.ok).Inner);
		calldata.Add(new FieldElement(test.x).Inner);
		calldata.Add(new FieldElement(test.y).Inner);
		calldata.Add(new FieldElement(test.z).Inner);
		calldata.Add(new FieldElement(test.a.high).Inner);
		calldata.Add(new FieldElement(test.a.low).Inner);

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "set_test",
                calldata = calldata.ToArray()
            }
        });
    }
            

    
    // Call the `upgrade` system with the specified Account and calldata
    // Returns the transaction hash. Use `WaitForTransaction` to wait for the transaction to be confirmed.
    public async Task<FieldElement> upgrade(Account account, FieldElement new_class_hash) {
        List<dojo.FieldElement> calldata = new List<dojo.FieldElement>();
        calldata.Add(new_class_hash.Inner);

        return await account.ExecuteRaw(new dojo.Call[] {
            new dojo.Call{
                to = new FieldElement(contractAddress).Inner,
                selector = "upgrade",
                calldata = calldata.ToArray()
            }
        });
    }
            
}
        