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

export function SeeBooks() {
  useRole("ADMIN");
  const toast = useToast();

  const [refreshSignal, setRefreshSignal] = useState(false);

  const { data: booksData, isLoading } = useFetch("/books", refreshSignal);
  // const books = useMemo(() => data?.data?.books?.reverse() || [], [data]);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    if (!booksData?.data?.books) return;
    setBooks(booksData.data.books.reverse());
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
      <LoadingScreen when={isLoading} text="Getting Books" />
      <LoadingScreen when={isDeleteLoading} text="Deleting the book" />

      <DefaultLayout>
        <Container maxW="8xl" py={8}>
          <HStack justifyContent="space-between">
            <Text as="h1" fontSize="2xl" fontWeight="bold">
              Books
            </Text>
            <HStack w="full" maxW="800px">
              <Box flex={1}>
                <SearchSantri
                  searchValue={searchFilter}
                  setSearchValue={setSearchFilter}
                  availibilityValue={availibilityFilter}
                  setAvailibilityValue={setAvailibilityFilter}
                  genreValue={genreFilter}
                  setGenreValue={setGenreFilter}
                />
              </Box>
              <Button
                leftIcon={<HiPlus />}
                colorScheme="blue"
                variant="solid"
                px={8}
                onClick={onAddBookOpen}
              >
                Add Book
              </Button>
            </HStack>
          </HStack>
          <TableContainer
            border="1px"
            borderColor="gray.300"
            p={4}
            borderRadius="xl"
            my={4}
          >
            <Table size="sm">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Author</Th>
                  <Th>Publisher</Th>
                  <Th>Books Available</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredBooks.map((book) => (
                  <Tr key={book._id}>
                    <Td>{book.title}</Td>
                    <Td>{book.author}</Td>
                    <Td>{book.publisher}</Td>
                    <Td>
                      {book.numOfAvailableBooks}/{book.numOfBooks}
                    </Td>
                    <Td>
                      <HStack>
                        <Button
                          size="sm"
                          colorScheme="blue"
                          onClick={() => {
                            onDetailBookOpen();
                            setSelectedBook(book);
                          }}
                        >
                          Detail
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="green"
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
                          Delete
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
        title="Warning"
        subtitle={`Remove ${selectedBook?.title}?`}
        actionButtonText="Delete"
        isOpen={isDeleteBookOpen}
        onClose={onDeleteBookClose}
        onActionClick={async () => {
          try {
            setIsDeleteLoading(true);
            const fetcher = createFetcher();
            await fetcher.delete("/books/" + selectedBook._id);
            setRefreshSignal((s) => !s);
            toast({
              title: "Success",
              description: `${selectedBook.title} deleted`,
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
