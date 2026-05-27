import { Pencil, Trash2, BookOpen } from 'lucide-react';

export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Color-coded genre bar */}
      <div className="h-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 w-full" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
            {book.genre || 'Uncategorized'}
          </span>
          <span className="text-xs text-gray-400">{book.year}</span>
        </div>
        <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
        {book.description && (
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 flex-1">
            {book.description}
          </p>
        )}
        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 py-1.5 rounded-lg hover:bg-blue-50 transition"
          >
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm text-gray-600 hover:text-red-600 py-1.5 rounded-lg hover:bg-red-50 transition"
          >
            <Trash2 size={14} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}