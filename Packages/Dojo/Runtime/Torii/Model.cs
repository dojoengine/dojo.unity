using System;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;

namespace Dojo.Torii
{
    public unsafe class Model
    {
        private string _name;
        public string name => _name;
        private Dictionary<string, Member> _members;
        public Dictionary<string, Member> members => _members;

        public Model(dojo.Model model)
        {
            _name = model.name;
            _members = new Dictionary<string, Member>(model.members.ToArray().Select(m => new KeyValuePair<string, Member>(m.name, new Member(m))));
        }
    }
}