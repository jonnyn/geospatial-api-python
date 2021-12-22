import React from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "react-query";
import { deleteStation } from "api";
import { AlertDialog } from "components";

const DeleteStation = ({ deleteId }: { deleteId: number | undefined }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Access the client
  const queryClient = useQueryClient();

  // Mutations
  const { mutate } = useMutation(
    (stationId: number | undefined) => deleteStation(stationId),
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("allStations");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const onCancelDelete = () => {
    onClose();
  };

  const onConfirmDelete = () => {
    mutate(deleteId);
    onClose();
  };

  return (
    <>
      <Button colorScheme="green" m={3} onClick={onOpen}>
        Delete
      </Button>
      <AlertDialog
        isOpen={isOpen}
        titleText="Delete Station"
        bodyText="Are you sure you want to delete this station?"
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />
    </>
  );
};

export default DeleteStation;
