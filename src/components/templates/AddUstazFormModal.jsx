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
import { useRef, useState } from "react";
// import { ImageUpload } from "../elements/ImageUpload";
import { LoadingScreen } from "./loadingScreen/LoadingScreen";

export function AddUstazFormModal({ isOpen, onClose, setRefreshSignal }) {
  const formRef = useRef();
  const toast = useToast();

  const [imageUrl, setImageUrl] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addBookHandler = async () => {
    try {
      setIsLoading(true);
      const form = formRef.current;

      const book = {
        nama: form.nama.value,
        jenisKelamin: form.jenisKelamin.value,
        alamat: form.alamat.value,
      };

      if (
        !book.nama ||
        !book.jenisKelamin
        // !book.publisher ||
        // !book.synopsis ||
        // !book.imageUrl
      ) {
        toast({
          title: "Error",
          description:
            "Nama dan Jenis Kelamin harus diisi",
          status: "error",
          duration: 5000,
          isClosable: true,
        });

        return;
      }

      const fetcher = createFetcher();

      const res = await fetcher.post("/ustaz", book);
      if (!res.data.success) throw new Error(res.data.error);

      toast({
        title: "Sukses!",
        description: `${book.nama} berhasil ditambahkan.`,
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
      <LoadingScreen when={isLoading} text="Menambahkan data..." />
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
          <ModalHeader>Tambah Data Ustaz</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              spacing={4}
              direction={{ base: "column-reverse", md: "row" }}
            >
              {/* <Center flex={2} py={{ base: 0, md: 8 }}>
                <ImageUpload
                  setIsImageLoading={setIsImageLoading}
                  setImageUrl={setImageUrl}
                />
              </Center> */}
              <Stack flex={3} as="form" spacing={4} ref={formRef}>
                <TextInput title="Nama" name="nama" />
                <SelectOptionInput
                  title="Jenis Kelamin"
                  name="jenisKelamin"
                  options={["L", "P"]}
                />                
                <TextInput title="Alamat" name="alamat" />
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="green"
              w="full"
              onClick={addBookHandler}
              disabled={isImageLoading || isLoading}
            >
              Tambah Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
