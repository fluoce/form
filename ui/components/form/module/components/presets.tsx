import { PRESET_DATA } from "../data/preset"

export function Presets() {
  return PRESET_DATA?.map((p) => (
    <div
      key={p?.name}
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-accent"
    >
      <span
        className="rounded-md p-1.5"
        style={{
          backgroundColor: `${p?.color}25`,
        }}
      >
        {p?.icon}
      </span>
      <span className="text-sm">{p?.name}</span>
    </div>
  ))
}
