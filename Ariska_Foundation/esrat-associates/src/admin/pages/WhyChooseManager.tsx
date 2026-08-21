import ListManager from '../components/ListManager';
import { getWhyChoose, updateWhyChoose } from '../api';

type Item = { id?: number; order: number; title: string; icon: string };

export default function WhyChooseManager() {
  return (
    <ListManager<Item>
      title="Why Choose Us"
      description="Feature highlights shown on the homepage"
      fetchFn={getWhyChoose}
      saveFn={updateWhyChoose}
      emptyItem={{ order: 0, title: '', icon: 'CheckCircle' }}
      renderRow={(item, idx, update) => (
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <input value={item.title}
              onChange={(e) => update(idx, { ...item, title: e.target.value })}
              placeholder="Feature title"
              className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
          </div>
          <input value={item.icon}
            onChange={(e) => update(idx, { ...item, icon: e.target.value })}
            placeholder="Icon (Lucide)"
            className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-[#C9A84C]" />
        </div>
      )}
    />
  );
}
