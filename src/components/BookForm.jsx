import { useForm } from 'react-hook-form';
import { GENRES } from '../utils/constants';

export default function BookForm({ defaultValues, onSubmit, onCancel, loading }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter book title"
        />
        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
        <input
          {...register('author', { required: 'Author is required' })}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Author name"
        />
        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
          <select
            {...register('genre')}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="">Select genre</option>
            {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <input
            type="number"
            {...register('year', { min: 1000, max: new Date().getFullYear() })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="2024"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Short description..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel}
          className="flex-1 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition">
          Cancel
        </button>
        <button type="submit" disabled={loading}
          className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-60">
          {loading ? 'Saving...' : 'Save Book'}
        </button>
      </div>
    </form>
  );
}