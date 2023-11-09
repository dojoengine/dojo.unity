
namespace Constants
{
    public static class TransactionPrefixes
    {
        public static readonly string Declare = "0x6465636c617265"; // encode("declare")
        public static readonly string Deploy = "0x6465706c6f79"; // encode("deploy")
        public static readonly string DeployAccount = "0x6465706c6f794163636f756e74"; // encode("deployAccount")
        public static readonly string Invoke = "0x696e766f6b65"; // encode("invoke")
        public static readonly string L1Handler = "0x6c3168616e646c6572"; // encode("l1handler")
    }
}