import { GENRES } from '../utils/constants';

export default function FilterPanel({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-3 py-1 rounded-full text-sm font-medium border transition
          ${!selected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
      >
        All
      </button>
      {GENRES.map((g) => (
        <button
          key={g}
          onClick={() => onChange(g)}
          className={`px-3 py-1 rounded-full text-sm font-medium border transition
            ${selected === g ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}