import ListManager from "../components/ListManager";
import { getWhyChoose, updateWhyChoose } from "../api";

const EMPTY = { text: "" };

export default function WhyChooseManager() {
  return (
    <ListManager
      title="Why Choose Us"
      description="Manage the checklist shown on the homepage"
      fetchFn={getWhyChoose}
      saveFn={updateWhyChoose}
      emptyItem={EMPTY}
      renderRow={(item, idx, update) => (
        <input
          value={item.text}
          onChange={(e) => update(idx, { ...item, text: e.target.value })}
          placeholder="e.g. 24/7 Customer Assistance"
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
        />
      )}
    />
  );
}
