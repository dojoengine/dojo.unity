using System;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;

namespace Dojo.Torii
{
    public unsafe class Model
    {
        public string Name { get; }
        public Dictionary<string, Member> Members { get; }

        public Model(string name, Dictionary<string, Member> members)
        {
            Name = name;
            Members = members;
        }

        public Model(dojo.Model model)
        {
            Name = model.name;
            Members = new Dictionary<string, Member>(model.members.ToArray().Select(m => new KeyValuePair<string, Member>(m.name, new Member(m))));
        }
    }
}