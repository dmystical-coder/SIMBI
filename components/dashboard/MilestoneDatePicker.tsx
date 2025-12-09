"use client";

import DateNavigator, { ViewType } from "./DateNavigator";

export type { ViewType };

interface MilestoneDatePickerProps {
  onDateChange?: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
}

export default function MilestoneDatePicker({
  onDateChange,
  onViewChange,
}: MilestoneDatePickerProps) {
  return (
    <DateNavigator
      onDateChange={onDateChange}
      onViewChange={onViewChange}
      showViewToggle={true}
      showDatePicker={true}
      showTodayButton={true}
    />
  );
}
