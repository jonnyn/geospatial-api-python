import React from "react";
import {
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
// import { AppContext } from "contexts";
import { fetchStations } from "api";
import { AddStation, UpdateStation, DeleteStation } from "./components";

const Home = () => {
  const history = useHistory();
  // const [state, dispatch] = useContext(AppContext);

  // Queries
  const { isLoading, isError, data, error } = useQuery<IStation[], Error>(
    "allStations",
    fetchStations
  );

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (isError) {
    return (
      <Center>
        <Box>Error: {error?.message}</Box>;
      </Center>
    );
  }

  return (
    <Flex p={5} direction="column">
      <Flex justify="flex-end" p={5} pb={20}>
        <AddStation />
      </Flex>
      <Table flex="1" variant="striped" size="lg">
        <TableCaption>Station List</TableCaption>
        <Thead>
          <Tr>
            <Th>Station Id</Th>
            <Th>Station Address</Th>
            <Th>Provider</Th>
            <Th isNumeric>Quantity</Th>
            <Th>Availability</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(
            ({ id, address, provider, quantity, availability }: IStation) => (
              <Tr key={id}>
                <Td>{id}</Td>
                <Td>{address}</Td>
                <Td>{provider}</Td>
                <Td isNumeric>{quantity}</Td>
                <Td>{availability ? "Yes" : "No"}</Td>
                <Td>
                  <Box>
                    <Button
                      colorScheme="green"
                      m={3}
                      onClick={() =>
                        history.push({
                          pathname: "/detail",
                          state: { stationId: id },
                        })
                      }
                    >
                      View
                    </Button>
                    <UpdateStation updateId={id} />
                    <DeleteStation deleteId={id} />
                  </Box>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Flex>
  );
};

export default Home;
