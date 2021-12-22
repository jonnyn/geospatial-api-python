import React, { useRef } from "react";
import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface IAlertDialog {
  isOpen: boolean;
  titleText: string;
  bodyText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const AlertDialog = ({
  isOpen,
  titleText,
  bodyText,
  onCancel,
  onConfirm,
}: IAlertDialog) => {
  const cancelRef = useRef(null);

  return (
    <ChakraAlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {titleText}
          </AlertDialogHeader>

          <AlertDialogBody>{bodyText}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCancel}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={onConfirm} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </ChakraAlertDialog>
  );
};

export default AlertDialog;
