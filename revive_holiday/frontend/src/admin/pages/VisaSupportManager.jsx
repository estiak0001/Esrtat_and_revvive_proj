import ListManager from "../components/ListManager";
import { getVisaSupport, updateVisaSupport } from "../api";

const EMPTY = { text: "" };

export default function VisaSupportManager() {
  return (
    <ListManager
      title="Visa Support"
      description="Manage the 'We Support' list on the Visa Assistance page"
      fetchFn={getVisaSupport}
      saveFn={updateVisaSupport}
      emptyItem={EMPTY}
      renderRow={(item, idx, update) => (
        <input
          value={item.text}
          onChange={(e) => update(idx, { ...item, text: e.target.value })}
          placeholder="e.g. Tourist Visas"
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
        />
      )}
    />
  );
}
