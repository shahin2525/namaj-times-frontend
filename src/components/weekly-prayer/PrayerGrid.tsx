/* eslint-disable @typescript-eslint/no-explicit-any */
import PrayerCard from "@/components/prayer/PrayerCard";

export default function PrayerGrid({ prayers }: any) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {prayers.map((prayer: any) => (
        <PrayerCard
          key={prayer.key}
          prayer={prayer}
          isCurrent={prayer.isCurrent}
          isNext={prayer.isNext}
        />
      ))}
    </div>
  );
}
