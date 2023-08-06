import { Box } from "@chakra-ui/react";
import BookCard from "./BookCard";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

const SantriList = ({ error, isLoading, santri }) => {
  return (
    <Box mt={4} mx="-8px">
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      <TableContainer>
      <Table variant='simple' colorScheme='teal'>
          <Thead>
            <Tr>
              <Th>Nama</Th>
              <Th>Jenis Kelamin</Th>
              <Th >Tahun Masuk</Th>
            </Tr>
          </Thead>
          <Tbody>
            {santri?.map((santri) => (
              <Tr key={santri._id}>
                <Td>{santri.nama}</Td>
                <Td>{santri.jenisKelamin}</Td>
                <Td>{santri.tahunMasuk}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SantriList;
