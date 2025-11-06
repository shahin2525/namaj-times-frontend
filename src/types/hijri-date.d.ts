// src/types/hijri-date.d.ts
declare module "hijri-date" {
  class HijriDate {
    constructor(date?: Date | string | number);
    getDate(): number;
    getMonth(): number;
    getFullYear(): number;
    getMonthName(): string;
    toString(): string;

    // Add other methods you might use
    getDay(): number;
    getHours(): number;
    getMinutes(): number;
    getSeconds(): number;
    valueOf(): number;
  }

  export = HijriDate;
}
