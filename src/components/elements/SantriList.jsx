import { Box } from "@chakra-ui/react";
import BookCard from "./BookCard";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
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
              <Th >Tempat</Th>
            </Tr>
          </Thead>
          <Tbody>
            {santri?.map((santri) => (
              <Tr key={santri._id}>
                <Td>{santri.nama}</Td>
                <Td>{santri.jenisKelamin}</Td>
                <Td>25.4</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SantriList;
