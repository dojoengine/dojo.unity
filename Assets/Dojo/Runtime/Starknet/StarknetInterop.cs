using System;
using System.Diagnostics;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using AOT;
using bottlenoselabs.C2CS.Runtime;
using Newtonsoft.Json;
using Debug = UnityEngine.Debug;
using dojo_bindings;
using System.Text.RegularExpressions;

namespace Dojo.Starknet
{
  public class StarknetInterop
  {
#if UNITY_IOS
    // Stub implementations for non-WebGL platforms
    public static IntPtr NewProvider(CString nodeUrl)
    {
      Debug.LogWarning("NewProvider called on non-WebGL platform.");
      return IntPtr.Zero;
    }

    public static IntPtr NewAccount(IntPtr provider, CString privateKey, CString address, Action<IntPtr> cb)
    {
      Debug.LogWarning("NewAccount called on non-WebGL platform.");
      cb(IntPtr.Zero);
      return IntPtr.Zero;
    }

    public static string AccountAddress(IntPtr account)
    {
      Debug.LogWarning("AccountAddress called on non-WebGL platform.");
      return "0x0";
    }

    public static string AccountChainId(IntPtr account)
    {
      Debug.LogWarning("AccountChainId called on non-WebGL platform.");
      return "0x0";
    }

    public static void AccountNonce(IntPtr account, Action<string> cb)
    {
      Debug.LogWarning("AccountNonce called on non-WebGL platform.");
      cb("0x0");
    }

    public static void AccountExecuteRaw(IntPtr account, CString calls, Action<string> cb)
    {
      Debug.LogWarning("AccountExecuteRaw called on non-WebGL platform.");
      cb("0x0");
    }

    public static void AccountDeployBurner(IntPtr account, CString privateKey, Action<IntPtr> cb)
    {
      Debug.LogWarning("AccountDeployBurner called on non-WebGL platform.");
      cb(IntPtr.Zero);
    }

    public static void Call(IntPtr provider, CString call, CString blockId, Action<string> cb)
    {
      Debug.LogWarning("Call called on non-WebGL platform.");
      cb("[]");
    }

    public static void WaitForTransaction(IntPtr provider, CString transactionHash, Action<bool> cb)
    {
      Debug.LogWarning("WaitForTransaction called on non-WebGL platform.");
      cb(false);
    }

    public static string NewSigningKey()
    {
      Debug.LogWarning("NewSigningKey called on non-WebGL platform.");
      return "0x0";
    }

    public static string Sign(CString privateKey, CString hash)
    {
      Debug.LogWarning("Sign called on non-WebGL platform.");
      return "0x0";
    }

    public static string NewVerifyingKey(CString privateKey)
    {
      Debug.LogWarning("NewVerifyingKey called on non-WebGL platform.");
      return "0x0";
    }

    public static bool Verify(CString publicKey, CString hash, CString r, CString s)
    {
      Debug.LogWarning("Verify called on non-WebGL platform.");
      return false;
    }

    private static string SerializeByteArray(CString byteArray)
    {
      Debug.LogWarning("SerializeByteArray called on non-WebGL platform.");
      return "[]";
    }

    private static string DeserializeByteArray(CString felts)
    {
      Debug.LogWarning("DeserializeByteArray called on non-WebGL platform.");
      return "";
    }

    public static string PoseidonHash(CString str)
    {
      Debug.LogWarning("PoseidonHash called on non-WebGL platform.");
      return "0x0";
    }
#else
    [DllImport("__Internal")]
    public static extern IntPtr NewProvider(CString nodeUrl);

    [DllImport("__Internal")]
    public static extern IntPtr NewAccount(IntPtr provider, CString privateKey, CString address, Action<IntPtr> cb);

    [DllImport("__Internal")]
    public static extern string AccountAddress(IntPtr account);

    [DllImport("__Internal")]
    public static extern string AccountChainId(IntPtr account);

    [DllImport("__Internal")]
    public static extern void AccountNonce(IntPtr account, Action<string> cb);

    [DllImport("__Internal")]
    public static extern void AccountExecuteRaw(IntPtr account, CString calls, Action<string> cb);

    [DllImport("__Internal")]
    public static extern void AccountDeployBurner(IntPtr account, CString privateKey, Action<IntPtr> cb);

    [DllImport("__Internal")]
    public static extern void Call(IntPtr provider, CString call, CString blockId, Action<string> cb);

    [DllImport("__Internal")]
    public static extern void WaitForTransaction(IntPtr provider, CString transactionHash, Action<bool> cb);

    [DllImport("__Internal")]
    public static extern string NewSigningKey();

    [DllImport("__Internal")]
    public static extern string Sign(CString privateKey, CString hash);

    [DllImport("__Internal")]
    public static extern string NewVerifyingKey(CString privateKey);

    [DllImport("__Internal")]
    public static extern bool Verify(CString publicKey, CString hash, CString r, CString s);

    [DllImport("__Internal")]
    private static extern string SerializeByteArray(CString byteArray);

    [DllImport("__Internal")]
    private static extern string DeserializeByteArray(CString felts);

    [DllImport("__Internal")]
    public static extern string PoseidonHash(CString str);
#endif

    public class NewAccountHelper
    {
      public static TaskCompletionSource<IntPtr> Tcs;

      [MonoPInvokeCallback(typeof(Action<IntPtr>))]
      public static void Callback(IntPtr result)
      {
        Tcs.SetResult(result);
      }
    }

    public static Task<IntPtr> NewAccountAsync(IntPtr provider, SigningKey privateKey, FieldElement address)
    {
      NewAccountHelper.Tcs = new TaskCompletionSource<IntPtr>();
      NewAccount(provider, new CString(privateKey.Inner.Hex()), new CString(address.Hex()), NewAccountHelper.Callback);
      return NewAccountHelper.Tcs.Task;
    }

    public class AccountNonceHelper
    {
      public static TaskCompletionSource<FieldElement> Tcs;

      [MonoPInvokeCallback(typeof(Action<string>))]
      public static void Callback(string result)
      {
        Tcs.SetResult(new FieldElement(result));
      }
    }

    public static Task<FieldElement> AccountNonceAsync(IntPtr account)
    {
      AccountNonceHelper.Tcs = new TaskCompletionSource<FieldElement>();
      AccountNonce(account, AccountNonceHelper.Callback);
      return AccountNonceHelper.Tcs.Task;
    }

    public class AccountExecuteRawHelper
    {
      public static TaskCompletionSource<FieldElement> Tcs;

      [MonoPInvokeCallback(typeof(Action<string>))]
      public static void Callback(string result)
      {
        Tcs.SetResult(new FieldElement(result));
      }
    }

    struct SerializedCall
    {
      public SerializedCall(FieldElement to, string selector, FieldElement[] calldata)
      {
        this.to = to.Hex();
        this.selector = selector;
        this.calldata = calldata.Select(f => f.Hex()).ToArray();
      }

      // hex string of address
      public string to;
      // the unhashed selector
      public string selector;
      // array of hex strings
      public string[] calldata;
    }

    class SerializedBlockId
    {
      public static object Serialize(dojo.BlockId blockId)
      {
        return blockId.tag switch
        {
          dojo.BlockId_Tag.Hash => new BlockIdHash { Hash = new FieldElement(blockId.hash).Hex() },
          dojo.BlockId_Tag.Number => new BlockIdNumber { Number = blockId.number.ToString() },
          dojo.BlockId_Tag.BlockTag_ => new BlockIdTag
          {
            BlockTag = blockId.block_tag switch
            {
              dojo.BlockTag.Latest => "Latest",
              dojo.BlockTag.Pending => "Pending",
              _ => throw new Exception("Unknown block tag")
            }
          },
          _ => throw new Exception("Unknown block id type")
        };
      }

      public struct BlockIdHash
      {
        public string Hash;
      }

      public struct BlockIdNumber
      {
        public string Number;
      }

      public struct BlockIdTag
      {
        public string BlockTag;
      }
    }

    public static Task<FieldElement> AccountExecuteRawAsync(IntPtr account, dojo.Call[] calls)
    {
      AccountExecuteRawHelper.Tcs = new TaskCompletionSource<FieldElement>();
      AccountExecuteRaw(account, new CString(JsonConvert.SerializeObject(calls.Select(call => new SerializedCall(new FieldElement(call.to), call.selector, call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray())).ToArray())), AccountExecuteRawHelper.Callback);
      return AccountExecuteRawHelper.Tcs.Task;
    }

    public class AccountDeployBurnerHelper
    {
      public static TaskCompletionSource<IntPtr> Tcs;

      [MonoPInvokeCallback(typeof(Action<IntPtr>))]
      public static void Callback(IntPtr result)
      {
        Tcs.SetResult(result);
      }
    }

    public static Task<IntPtr> AccountDeployBurnerAsync(IntPtr account, SigningKey signingKey)
    {
      AccountDeployBurnerHelper.Tcs = new TaskCompletionSource<IntPtr>();
      AccountDeployBurner(account, new CString(signingKey.Inner.Hex()), AccountDeployBurnerHelper.Callback);
      return AccountDeployBurnerHelper.Tcs.Task;
    }

    public class CallHelper
    {
      public static TaskCompletionSource<FieldElement[]> Tcs;

      [MonoPInvokeCallback(typeof(Action<FieldElement[]>))]
      public static void Callback(string result)
      {
        Tcs.SetResult(JsonConvert.DeserializeObject<string[]>(result).Select(f => new FieldElement(f)).ToArray());
      }
    }

    public static Task<FieldElement[]> CallAsync(IntPtr provider, dojo.Call call, dojo.BlockId blockId)
    {
      WaitForTransactionHelper.Tcs = new TaskCompletionSource<bool>();
      var serializedCall = new SerializedCall(new FieldElement(call.to), call.selector, call.calldata.ToArray().Select(f => new FieldElement(f)).ToArray());
      object serializedBlockId = SerializedBlockId.Serialize(blockId);

      Call(provider, new CString(JsonConvert.SerializeObject(serializedCall)), new CString(JsonConvert.SerializeObject(serializedBlockId)), CallHelper.Callback);
      return CallHelper.Tcs.Task;
    }

    public class WaitForTransactionHelper
    {
      public static TaskCompletionSource<bool> Tcs;

      [MonoPInvokeCallback(typeof(Action<bool>))]
      public static void Callback(bool result)
      {
        Tcs.SetResult(result);
      }
    }

    public static Task<bool> WaitForTransactionAsync(IntPtr provider, FieldElement transactionHash)
    {
      WaitForTransactionHelper.Tcs = new TaskCompletionSource<bool>();
      WaitForTransaction(provider, new CString(transactionHash.Hex()), WaitForTransactionHelper.Callback);
      return WaitForTransactionHelper.Tcs.Task;
    }

        public static FieldElement[] SerializeByteArray(string byteArray)
        {
            return JsonConvert.DeserializeObject<string[]>(SerializeByteArray(new CString(byteArray))).Select(f => new FieldElement(f)).ToArray();
        }

        public static string DeserializeByteArray(FieldElement[] felts)
        {
            return DeserializeByteArray(new CString(JsonConvert.SerializeObject(felts.Select(f => f.Hex()).ToArray())));
        }

        public static string PoseidonHash(FieldElement[] felts)
        {
            return PoseidonHash(new CString(JsonConvert.SerializeObject(felts.Select(f => f.Hex()).ToArray())));
        }
  }
}