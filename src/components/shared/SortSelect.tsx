"use client";

import { useQueryState } from "nuqs";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortParser } from "@/features/ticket/constants";

type OptionItem = {
  label: string;
  value: string;
};

type SortSelectProps = {
  options: Record<string, OptionItem[]>;
};

const SortSelect = ({ options }: SortSelectProps) => {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const formatGroupLabel = (key: string) => {
    // Convert camelCase to Title Case
    // e.g., "timeSortOptions" -> "Time Sort Options"
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  return (
    <Select onValueChange={handleSortChange} defaultValue={sort}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(options).map(([groupKey, groupOptions]) => (
          <SelectGroup key={groupKey}>
            <SelectLabel>{formatGroupLabel(groupKey)}</SelectLabel>
            {groupOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
