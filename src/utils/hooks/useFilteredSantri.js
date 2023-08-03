import { useMemo } from "react";

export const useFilteredSantri = (
  santri,
  searchFilter
) => {
  const filteredSantri = useMemo(() => {
    return santri
      .filter((santri) => {
        const searches = searchFilter
          .toLowerCase()
          .split(" ")
          .filter((s) => s !== "");
        if (searchFilter === "") return true;
        if (
          searches.every((search) => {
            return (
              santri.nama.toLowerCase().includes(search) ||
              santri.jenisKelamin.toLowerCase().includes(search)
            );
          })
        ) {
          return true;
        }
        return false;
      });
  }, [santri, searchFilter]);

  return filteredSantri;
};
