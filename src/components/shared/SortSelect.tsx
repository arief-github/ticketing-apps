"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OptionItem = {
  label: string;
  value: string;
};

type SortSelectProps = {
  defaultValue: string;
  options: Record<string, OptionItem[]>;
};

const SortSelect = ({ defaultValue, options }: SortSelectProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const formatGroupLabel = (key: string) => {
    // Convert camelCase to Title Case
    // e.g., "timeSortOptions" -> "Time Sort Options"
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === defaultValue) {
      params.delete("sort");
    } else if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select
      onValueChange={handleSortChange}
      defaultValue={searchParams.get("sort")?.toString() || defaultValue}
    >
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
