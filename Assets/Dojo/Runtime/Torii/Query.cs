using System;
using dojo_bindings;

namespace Dojo.Torii {
    public class Query {
        public uint limit;
        public uint offset;
        public object clause;

        public Query(dojo.Query query)
        {
            limit = query.limit;
            offset = query.offset;
            clause = query.clause.tag switch
            {
                dojo.COptionClause_Tag.SomeClause => query.clause.some.tag switch
                {
                    dojo.Clause_Tag.Keys => new KeysClause(query.clause.some.keys),
                    // dojo.Clause_Tag.CMember => new MemberClause(query.clause.some.c_member),
                    _ => throw new Exception("Clause not supported")
                },
                dojo.COptionClause_Tag.NoneClause => null,
            };
        }

        public class KeysClause
        {
            public string model;
            public string[] keys;

            public KeysClause(dojo.KeysClause keysClause)
            {
                model = keysClause.model;
                keys = keysClause.keys.ToArray();
            }
        }

        // public class MemberClause
        // {
        //     public string model;
        //     public string member;
        //     public string @operator;
        //     public object value;

        //     public MemberClause(dojo.MemberClause memberClause)
        //     {
        //         model = memberClause.model;
        //         member = memberClause.member;
        //         @operator = memberClause.operator_ switch
        //         {
        //             dojo.ComparisonOperator.Eq => "Eq",
        //             dojo.ComparisonOperator.Neq => "Neq",
        //             dojo.ComparisonOperator.Lt => "Lt",
        //             dojo.ComparisonOperator.Lte => "Lte",
        //             dojo.ComparisonOperator.Gt => "Gt",
        //             dojo.ComparisonOperator.Gte => "Gte",
        //             _ => throw new Exception("Unknown comparison operator")
        //         };
        //         value = HandleCValue(memberClause.value);
        //     }
        // }

        // public class Value {
        //     public object primitive_type;
        //     public object value_type;

        //     public Value(dojo.Value value) {

        //     }
        // }
    }
}