import ListManager from "../components/ListManager";
import { getCoreValues, updateCoreValues } from "../api";

const EMPTY = { icon: "", title: "", description: "" };

export default function CoreValuesManager() {
  return (
    <ListManager
      title="Core Values"
      description="Manage the core values shown on the About page"
      fetchFn={getCoreValues}
      saveFn={updateCoreValues}
      emptyItem={EMPTY}
      renderRow={(item, idx, update) => (
        <div className="grid grid-cols-3 gap-2">
          <input
            value={item.icon}
            onChange={(e) => update(idx, { ...item, icon: e.target.value })}
            placeholder="Icon (Lucide name)"
            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
          />
          <input
            value={item.title}
            onChange={(e) => update(idx, { ...item, title: e.target.value })}
            placeholder="Title"
            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
          />
          <input
            value={item.description}
            onChange={(e) => update(idx, { ...item, description: e.target.value })}
            placeholder="Description"
            className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
          />
        </div>
      )}
    />
  );
}
