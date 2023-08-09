import BookModal from "@/components/elements/BookModal";
import ConfirmDialog from "@/components/elements/ConfirmDialog";
import { SearchSantri } from "@/components/elements/search";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { AddBookFormModal } from "@/components/templates/AddBookFormModal";
import { EditBookFormModal } from "@/components/templates/EditBookFormModal";
import { LoadingScreen } from "@/components/templates/loadingScreen/LoadingScreen";
import { useFetch } from "@/utils/hooks/useFetch";
import { useFilteredSantri } from "@/utils/hooks/useFilteredSantri";
import { useRole } from "@/utils/hooks/useRole";
import { createFetcher } from "@/utils/services/fetcher";
import {
  Box,
  Button,
  Container,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { HiPlus } from "react-icons/hi2";

export function SeeSantri() {
  useRole("ADMIN");
  const toast = useToast();

  const [refreshSignal, setRefreshSignal] = useState(false);

  const { data: booksData, isLoading } = useFetch("/santri", refreshSignal);
  // const books = useMemo(() => data?.data?.books?.reverse() || [], [data]);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (!booksData?.data?.santri) return;
    setBooks(booksData.data.santri.reverse());
  }, [booksData]);

  // filters
  const [searchFilter, setSearchFilter] = useState("");
  const [availibilityFilter, setAvailibilityFilter] = useState("ShowAll");
  const [genreFilter, setGenreFilter] = useState("All Genres");

  const filteredBooks = useFilteredSantri(
    books,
    searchFilter,
    availibilityFilter,
    genreFilter,
  );
  const [selectedBook, setSelectedBook] = useState();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const {
    isOpen: isAddBookOpen,
    onOpen: onAddBookOpen,
    onClose: onAddBookClose,
  } = useDisclosure();

  const {
    isOpen: isEditBookOpen,
    onOpen: onEditBookOpen,
    onClose: onEditBookClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteBookOpen,
    onOpen: onDeleteBookOpen,
    onClose: onDeleteBookClose,
  } = useDisclosure();

  const {
    isOpen: isDetailBookOpen,
    onOpen: onDetailBookOpen,
    onClose: onDetailBookClose,
  } = useDisclosure();

  return (
    <>
      <LoadingScreen when={isLoading} text="Mengambil data..." />
      <LoadingScreen when={isDeleteLoading} text="Menghapus data..." />

      <DefaultLayout>
        <Container maxW="8xl" py={8}>
          <HStack justifyContent="space-between">
            <Text as="h1" fontSize="2xl" fontWeight="bold">
              Data Santri
            </Text>
            <HStack w="full" maxW="800px">
              <Box flex={1}>
                <SearchSantri
                  searchValue={searchFilter}
                  setSearchValue={setSearchFilter}
                />
              </Box>
              <Button
                leftIcon={<HiPlus />}
                colorScheme="green"
                variant="solid"
                px={8}
                onClick={onAddBookOpen}
              >
                Tambah
              </Button>
            </HStack>
          </HStack>
          <TableContainer
            border="1px"
            borderColor="gray.300"
            p={4}
            borderRadius="xl"
            my={4}
            maxHeight="757px"  
            overflowY="auto"
          >
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Nama</Th>
                  <Th>Jenis Kelamin</Th>
                  <Th>Tempat, Tanggal Lahir</Th>
                  <Th>Nama Wali</Th>
                  <Th>Alamat</Th>
                  <Th>Tahun Masuk</Th>
                  <Th>Kelas</Th>
                  <Th>Perolehan Juz</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredBooks.map((book) => (
                  <Tr key={book._id}>
                    <Td>{book.nama}</Td>
                    <Td>{book.jenisKelamin}</Td>
                    <Td>{book.ttl}</Td>
                    <Td>{book.namaWali}</Td>
                    <Td>{book.alamat}</Td>
                    <Td>{book.tahunMasuk}</Td>
                    <Td>{book.kelas}</Td>
                    <Td>{book.juz}</Td>
                    <Td>
                      <HStack>
                        {/* <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            onDetailBookOpen();
                            setSelectedBook(book);
                          }}
                        >
                          Detail
                        </Button> */}
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            onEditBookOpen();
                            setSelectedBook(book);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => {
                            onDeleteBookOpen();
                            setSelectedBook(book);
                          }}
                        >
                          Hapus
                        </Button>
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Container>
      </DefaultLayout>

      <AddBookFormModal
        isOpen={isAddBookOpen}
        onClose={onAddBookClose}
        setRefreshSignal={setRefreshSignal}
      />

      <EditBookFormModal
        isOpen={isEditBookOpen}
        onClose={onEditBookClose}
        setRefreshSignal={setRefreshSignal}
        initialBook={selectedBook}
      />

      <BookModal
        isOpen={isDetailBookOpen}
        onClose={onDetailBookClose}
        bookOpened={selectedBook}
      ></BookModal>

      <ConfirmDialog
        title="Peringatan!"
        subtitle={`Hapus ${selectedBook?.nama}?`}
        actionButtonText="Hapus"
        isOpen={isDeleteBookOpen}
        onClose={onDeleteBookClose}
        onActionClick={async () => {
          try {
            setIsDeleteLoading(true);
            const fetcher = createFetcher();
            await fetcher.delete("/santri/" + selectedBook._id);
            setRefreshSignal((s) => !s);
            toast({
              title: "Sukses!",
              description: `${selectedBook.nama} berhasil dihapus`,
              status: "success",
              duration: 3000,
              isClosable: false,
            });
          } catch (error) {
            console.error("Error when deleting", error);
          } finally {
            setIsDeleteLoading(false);
          }
        }}
      />
    </>
  );
}
