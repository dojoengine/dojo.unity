using System;

namespace Dojo.Torii
{
    [Serializable]
    public class Page<T>
    {
#nullable enable

        public T[] items;
        public string? nextCursor;

        public Page(T[] items, string? nextCursor = null)
        {
            this.items = items;
            this.nextCursor = nextCursor;
        }
    }
}