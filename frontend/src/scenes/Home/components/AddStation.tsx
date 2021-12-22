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
import { useMutation, useQueryClient } from "react-query";
import { postStation } from "api";

const AddStation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newStation, setNewStation] = useState<IStation>({});

  // Access the client
  const queryClient = useQueryClient();
  // Mutations
  const { mutate, isLoading, isError } = useMutation(
    (station: IStation) => postStation(station),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("allStations");
        setNewStation({});
        onClose();
      },
    }
  );

  const handleChange = (name: string, value: string | number | boolean) => {
    setNewStation((prev: IStation) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setNewStation({});
    onOpen();
  };

  const handleClose = () => {
    setNewStation({});
    onClose();
  };

  return (
    <>
      <Button colorScheme="green" onClick={handleOpen}>
        Add New Station
      </Button>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Station</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Address" />
                <Input
                  placeholder="Station Address"
                  value={newStation.address}
                  onChange={(x) => handleChange("address", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Provider" />
                <Input
                  placeholder="Station Provider"
                  value={newStation.provider}
                  onChange={(x) => handleChange("provider", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Lat, Long" />
                <Input
                  placeholder="Latitude"
                  value={newStation.latitude}
                  onChange={(x) => handleChange("latitude", x.target.value)}
                />
                <Input
                  placeholder="Longitude"
                  value={newStation.longitude}
                  onChange={(x) => handleChange("longitude", x.target.value)}
                />
              </InputGroup>
              <InputGroup size="md">
                <InputLeftAddon w="30%" children="Quantity" />
                <Input
                  placeholder="Quantity on hand"
                  value={newStation.quantity}
                  onChange={(x) => handleChange("quantity", x.target.value)}
                />
              </InputGroup>
              <Checkbox
                colorScheme="green"
                isChecked={newStation.availability}
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
                <AlertTitle mr={2}>Error adding the station!</AlertTitle>
                <AlertDescription>Please try again.</AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <Button variant="ghost" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={() => mutate(newStation)}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddStation;
