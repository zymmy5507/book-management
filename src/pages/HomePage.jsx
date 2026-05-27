import { useState, useMemo } from 'react';
import { useBooks } from '../hooks/useBooks';
import { useDebounce } from '../hooks/useDebounce';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import BookForm from '../components/BookForm';
import { Plus, BookOpen } from 'lucide-react';

export default function HomePage() {
  const { books, loading, error, addBook, editBook, removeBook } = useBooks();
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const debouncedSearch = useDebounce(search);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchSearch =
        b.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.author?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchGenre = genre ? b.genre === genre : true;
      return matchSearch && matchGenre;
    });
  }, [books, debouncedSearch, genre]);

  const handleSubmit = async (data) => {
    setFormLoading(true);
    try {
      if (editingBook) {
        await editBook(editingBook.id, data);
      } else {
        await addBook(data);
      }
      setShowForm(false);
      setEditingBook(null);
    } finally {
      setFormLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600" size={32} />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Library</h1>
              <p className="text-sm text-gray-500">{books.length} books in collection</p>
            </div>
          </div>
          <button
            onClick={() => { setEditingBook(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm"
          >
            <Plus size={18} /> Add Book
          </button>
        </div>

        {/* Search + Filter */}
        <div className="space-y-3 mb-6">
          <SearchBar value={search} onChange={setSearch} />
          <FilterPanel selected={genre} onChange={setGenre} />
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <BookOpen size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-lg">No books found</p>
            <p className="text-sm">Try a different search or add a new book</p>
          </div>
        )}

        {/* Book Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((book) => (
              <BookCard key={book.id} book={book} onEdit={handleEdit} onDelete={removeBook} />
            ))}
          </div>
        )}
      </div>

      {/* Slide-in Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              {editingBook ? 'Edit Book' : 'Add New Book'}
            </h2>
            <BookForm
              defaultValues={editingBook || {}}
              onSubmit={handleSubmit}
              onCancel={() => { setShowForm(false); setEditingBook(null); }}
              loading={formLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
}