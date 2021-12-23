import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  InputGroup,
  Input,
  InputLeftAddon,
  Checkbox,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchStation, updateStation } from "api";

const UpdateStation = ({ updateId }: { updateId: number | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingStation, setPendingStation] = useState<IStation>({
    id: 0,
    address: "",
    provider: "",
    latitude: 0,
    longitude: 0,
    quantity: 0,
    availability: false,
  });
  // Access the client
  const queryClient = useQueryClient();
  // Queries
  const { isLoading, refetch } = useQuery<IStation, Error>(
    ["getStation", updateId],
    () => fetchStation({ id: updateId }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        setPendingStation(data);
      },
      onError: (error) => {
        console.log(`error`, error);
      },
    }
  );
  // Mutations - update station
  const { mutate, isError } = useMutation(
    (station: IStation) => updateStation(station),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("allStations");
        onClose();
      },
    }
  );

  const handleOpen = () => {
    onOpen();
    refetch();
  };

  const handleChange = (name: string, value: string | number | boolean) => {
    setPendingStation((prev: IStation) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Button colorScheme="green" m={3} onClick={handleOpen}>
        Update
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Station</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Address" />
                <Input
                  placeholder="Station Address"
                  value={pendingStation.address}
                  onChange={(x) => handleChange("address", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Provider" />
                <Input
                  placeholder="Station Provider"
                  value={pendingStation.provider}
                  onChange={(x) => handleChange("provider", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Lat, Long" />
                <Input
                  placeholder="Latitude"
                  value={pendingStation.latitude}
                  onChange={(x) => handleChange("latitude", x.target.value)}
                />
                <Input
                  placeholder="Longitude"
                  value={pendingStation.longitude}
                  onChange={(x) => handleChange("longitude", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Quantity" />
                <Input
                  placeholder="Quantity on hand"
                  value={pendingStation.quantity}
                  onChange={(x) => handleChange("quantity", x.target.value)}
                />
              </InputGroup>
              <Checkbox
                colorScheme="green"
                isChecked={pendingStation.availability}
                onChange={(e) => handleChange("availability", e.target.checked)}
              >
                Is the station available?
              </Checkbox>
            </Stack>
          </ModalBody>
          <ModalFooter>
            {isLoading && <Spinner />}
            {isError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Error updating the station!</AlertTitle>
                <AlertDescription>Please try again.</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => mutate(pendingStation)}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateStation;
