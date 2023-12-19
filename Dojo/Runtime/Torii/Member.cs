using System;
using System.Collections.Generic;
using System.Linq;
using dojo_bindings;

namespace Dojo.Torii
{
    public class Member
    {
        private string _name;
        public string name => _name;

        private dojo.Ty _ty;
        public dojo.Ty ty => _ty; 

        private bool _key;
        public bool key => _key;

        public Member(dojo.Member member)
        {
            _name = member.name;
            _ty = member.ty;
            _key = member.key;
        }

        // ~Member()
        // {
        //     dojo.ty_free(_ty);
        // }
    }
}