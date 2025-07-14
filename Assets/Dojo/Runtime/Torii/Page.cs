using System;

namespace Dojo.Torii
{
    [Serializable]
    public class Page<T>
    {
#nullable enable

        public T[] items;
        public string? next_cursor;

        public Page(T[] items, string? next_cursor = null)
        {
            this.items = items;
            this.next_cursor = next_cursor;
        }
    }
}