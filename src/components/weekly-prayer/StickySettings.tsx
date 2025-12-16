"use client";

interface Props {
  calculationMethod: string;
  asrMethod: string;
  onCalcChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onAsrChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  calcOptions: { value: string; label: string }[];
  asrOptions: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

export default function StickySettings({
  calculationMethod,
  asrMethod,
  onCalcChange,
  onAsrChange,
  calcOptions,
  asrOptions,
  t,
}: Props) {
  return (
    <div className="sticky top-4 z-30 bg-white rounded-xl shadow-md p-4 mb-8">
      <h2 className="font-semibold mb-3">{t("settings.title")}</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select
          value={calculationMethod}
          onChange={onCalcChange}
          className="p-2 border rounded-lg"
        >
          {calcOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          value={asrMethod}
          onChange={onAsrChange}
          className="p-2 border rounded-lg"
        >
          {asrOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
