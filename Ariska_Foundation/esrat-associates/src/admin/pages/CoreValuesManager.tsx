import ListManager from '../components/ListManager';
import { getCoreValues, updateCoreValues } from '../api';

type Item = { id?: number; order: number; title: string; icon: string; desc: string };

export default function CoreValuesManager() {
  return (
    <ListManager<Item>
      title="Core Values"
      description="Company values shown on the About page"
      fetchFn={getCoreValues}
      saveFn={updateCoreValues}
      emptyItem={{ order: 0, title: '', icon: 'Star', desc: '' }}
      renderRow={(item, idx, update) => (
        <div className="space-y-1.5">
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <input value={item.title}
                onChange={(e) => update(idx, { ...item, title: e.target.value })}
                placeholder="Value title (e.g. Integrity)"
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
            </div>
            <input value={item.icon}
              onChange={(e) => update(idx, { ...item, icon: e.target.value })}
              placeholder="Icon"
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
          </div>
          <textarea value={item.desc} rows={2}
            onChange={(e) => update(idx, { ...item, desc: e.target.value })}
            placeholder="Description"
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C] resize-none" />
        </div>
      )}
    />
  );
}
