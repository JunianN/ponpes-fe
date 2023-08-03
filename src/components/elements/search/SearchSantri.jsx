import { HStack } from "@chakra-ui/react";
import { SearchBar } from "./SearchBar";

export function SearchSantri({
  searchValue,
  setSearchValue,
}) {
  return (
    <HStack>
      <SearchBar value={searchValue} setValue={setSearchValue} />
    </HStack>
  );
}
