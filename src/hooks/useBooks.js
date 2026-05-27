import { useState, useEffect, useCallback } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from '../api/books';
import toast from 'react-hot-toast';

export function useBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await getBooks();
      const booksArray = Array.isArray(data) ? data : [];
      if (!Array.isArray(data)) {
        console.warn('Unexpected books API response:', data);
      }
      setBooks(booksArray);
    } catch (err) {
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBooks(); }, [fetchBooks]);

  const addBook = async (bookData) => {
    try {
      const { data } = await createBook(bookData);
      setBooks((prev) => [data, ...prev]);
      toast.success('Book added successfully!');
      return data;
    } catch {
      toast.error('Failed to add book.');
      throw new Error('Failed to add');
    }
  };

  const editBook = async (id, bookData) => {
    try {
      const { data } = await updateBook(id, bookData);
      setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
      toast.success('Book updated!');
      return data;
    } catch {
      toast.error('Failed to update book.');
      throw new Error('Failed to update');
    }
  };

  const removeBook = async (id) => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b.id !== id));
      toast.success('Book deleted.');
    } catch {
      toast.error('Failed to delete book.');
    }
  };

  return { books, loading, error, fetchBooks, addBook, editBook, removeBook };
}