import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { HiMagnifyingGlass } from "react-icons/hi2";

export function SearchBar({ value, setValue }) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <HiMagnifyingGlass />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Cari"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </InputGroup>
  );
}
