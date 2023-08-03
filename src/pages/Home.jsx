import SantriList from "@/components/elements/SantriList";
import { RenderIf } from "@/components/elements/RenderIf";
import { SearchSantri } from "@/components/elements/search";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { LoadingScreen } from "@/components/templates/loadingScreen/LoadingScreen";
import { useFetch } from "@/utils/hooks/useFetch";
import { useFilteredSantri } from "@/utils/hooks/useFilteredSantri";
import { useRole } from "@/utils/hooks/useRole";
import { Box, Container, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function Home() {
  // useRole();

  const { error, isLoading, data: santriData } = useFetch("/santri");

  const [santri, setSantri] = useState([]);
  useEffect(() => {
    if (!santriData?.data?.santri) return;
    setSantri(santriData.data.santri.reverse());
  }, [santriData]);

  const [searchFilter, setSearchFilter] = useState("");

  const filteredSantri = useFilteredSantri(
    santri,
    searchFilter
  );
console.log(filteredSantri)
  return (
    <>
      <LoadingScreen when={isLoading} text="Loading data..." />

      <DefaultLayout>
        <Box bg="gray.100" w="100%">
          <Container maxWidth="8xl" py={5}>
            <SearchSantri
              searchValue={searchFilter}
              setSearchValue={setSearchFilter}
            />
            <SantriList
              error={error}
              isLoading={isLoading}
              santri={filteredSantri}
            />

            <RenderIf when={santri?.length === 0}>
              <HStack spacing="4px" mt={8} w="full" justifyContent="center">
                <Text textAlign="center">
                  Belum ada data santri, silahkan masukkan data.
                </Text>
              </HStack>
            </RenderIf>

            <RenderIf when={santri?.length > 0 && filteredSantri?.length === 0}>
              <HStack spacing="4px" mt={8} w="full" justifyContent="center">
                <Text textAlign="center">
                  Tidak bisa menemukan santri dengan nama: <b>&quot;{searchFilter}&quot;</b>
                </Text>
              </HStack>
            </RenderIf>
          </Container>
        </Box>
      </DefaultLayout>  
    </>
  );
}
