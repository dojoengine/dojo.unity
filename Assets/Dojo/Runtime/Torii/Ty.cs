using System;
using dojo_bindings;

namespace Dojo.Torii
{
    // A managed type for the Ty structure
    // Frees the underlying dojo.Ty when the object is garbage collected
    public unsafe class Ty
    {
        private readonly dojo.Ty* _ty;

        public Ty(dojo.Ty* ty)
        {
            _ty = ty;
        }

        public dojo.Ty_Tag tag => _ty->tag;
        public dojo.Struct struct_ => _ty->struct_;
        public dojo.Enum enum_ => _ty->enum_;
        public dojo.Primitive primitive => _ty->primitive;
        public Span<dojo.Ty> tuple => _ty->tuple;

        // This is potentially dangerous. If Ty is copied, we will double free.
        ~Ty()
        {
            dojo.ty_free(_ty);
        }
    }
}