import ListManager from '../components/ListManager';
import { getIndustries, updateIndustries } from '../api';

type Item = { id?: number; order: number; name: string };

export default function IndustriesManager() {
  return (
    <ListManager<Item>
      title="Industries"
      description="Industries served — shown on the Industries page"
      fetchFn={getIndustries}
      saveFn={updateIndustries}
      emptyItem={{ order: 0, name: '' }}
      renderRow={(item, idx, update) => (
        <input value={item.name}
          onChange={(e) => update(idx, { ...item, name: e.target.value })}
          placeholder="Industry name"
          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
      )}
    />
  );
}
