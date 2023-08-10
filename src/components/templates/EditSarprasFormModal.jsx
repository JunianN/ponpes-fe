import {
  DecimalNumberInput,
  SelectOptionInput,
  TextAreaInput,
  TextInput,
} from "@/components/elements/Input";
import { createFetcher } from "@/utils/services/fetcher";
import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
// import { ImageUpload } from "../elements/ImageUpload";
import { LoadingScreen } from "./loadingScreen/LoadingScreen";

export function EditSarprasFormModal({
  initialBook,
  isOpen,
  onClose,
  setRefreshSignal,
}) {
  const formRef = useRef();
  const toast = useToast();

  // const [imageUrl, setImageUrl] = useState(initialBook?.imageUrl);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // note: on first render, initialBook may be undefined
  //   //       so, we need this
  //   setImageUrl(initialBook?.imageUrl);
  // }, [initialBook]);

  const editBookHandler = async () => {
    try {
      setIsLoading(true);
      const form = formRef.current;

      // const genres = form.genres.value
      //   .split(",")
      //   .map((genre) => genre.trim().toLowerCase());

      const book = {
        nama: form.nama.value,
        jumlah: form.jumlah.value,
      };

      if (
        !book.nama ||
        !book.jumlah
        // !book.author ||
        // !book.publisher ||
        // !book.synopsis ||
        // !book.imageUrl
      ) {
        toast({
          title: "Error",
          description:
            "Nama dan Jumlah harus diisi",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        return;
      }

      const fetcher = createFetcher();

      const res = await fetcher.put("/sarpras/" + initialBook._id, book);
      if (!res.data.success) throw new Error(res.data.error);

      toast({
        title: "Sukses!",
        description: `${book.nama} berhasil diubah`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setRefreshSignal((s) => !s);

      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something happened",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoadingScreen when={isLoading} text="Menyimpan data..." />
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size="4xl"
        scrollBehavior="inside"
        closeOnOverlayClick={false}
      >
        <ModalOverlay bg="blackAlpha.50" backdropFilter="blur(2px)" />
        <ModalContent>
          <ModalHeader>Edit Data Sarpras</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction={{ base: "column-reverse", md: "row" }}
            >
              {/* <Center flex={2} py={{ base: 0, md: 8 }}>
                <ImageUpload
                  initialImageUrl={initialBook?.imageUrl}
                  setIsImageLoading={setIsImageLoading}
                  setImageUrl={setImageUrl}
                />
              </Center> */}
              <Stack flex={3} as="form" spacing={4} ref={formRef}>
                <TextInput
                  title="Nama"
                  name="nama"
                  value={initialBook?.nama}
                />
                <DecimalNumberInput
                  title="Jumlah"
                  name="jumlah"
                  value={initialBook?.jumlah}
                />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              w="full"
              onClick={editBookHandler}
              disabled={isImageLoading || isLoading}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
