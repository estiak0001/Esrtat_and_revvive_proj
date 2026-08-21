import ListManager from "../components/ListManager";
import { getCorporateServices, updateCorporateServices } from "../api";

const EMPTY = { text: "" };

export default function CorporateServicesManager() {
  return (
    <ListManager
      title="Corporate Services"
      description="Manage the bulleted list on the Corporate Travel page"
      fetchFn={getCorporateServices}
      saveFn={updateCorporateServices}
      emptyItem={EMPTY}
      renderRow={(item, idx, update) => (
        <input
          value={item.text}
          onChange={(e) => update(idx, { ...item, text: e.target.value })}
          placeholder="e.g. Executive Travel Planning"
          className="w-full border border-gray-200 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-[#f98f0e]"
        />
      )}
    />
  );
}
