namespace Dojo.Torii {
    public class Page<T> {
        public T[] items;
        public string nextCursor;

        public Page(T[] items, string nextCursor) {
            this.items = items;
            this.nextCursor = nextCursor;
        }
    }
}