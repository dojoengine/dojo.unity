using System;
using dojo_bindings;

namespace Dojo.Torii {
    public class Query {
        public uint limit;
        public uint offset;
        public dojo.Clause? clause;

        public Query(uint limit, uint offset, dojo.Clause? clause = null) {
            this.limit = limit;
            this.offset = offset;
            this.clause = clause;
        }

        public Query(dojo.Query query)
        {
            limit = query.limit;
            offset = query.offset;
            clause = query.clause.tag switch
            {
                dojo.COptionClause_Tag.NoneClause => null,
                dojo.COptionClause_Tag.SomeClause => query.clause.some,
                _ => throw new Exception("Unknown clause tag")
            };
        }
    }
}