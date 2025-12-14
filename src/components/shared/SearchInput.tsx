"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";
import { searchParser } from "@/features/ticket/constants";

type SearchInputProps = {
  placeholder: string;
};

const SearchInput = ({ placeholder }: SearchInputProps) => {
  const [search, setSearch] = useQueryState("search", searchParser);

  const handleSearch = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      setSearch(value);
    },
    300
  );

  return (
    <Input
      defaultValue={search}
      type="search"
      placeholder={placeholder}
      className="w-full"
      onChange={handleSearch}
    />
  );
};

export default SearchInput;
