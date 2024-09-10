"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";

export default function DeleteResourceModal({ resourceName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // const response = await deleteResourceFromSheet(resourceName);
      // if (response.status === 200) {
      //   setSuccessMessage("Resource successfully deleted.");
      //   setLoading(false);
      //   setRefreshing(true);
      //   // Simulate a delay for page refresh
      //   await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second delay
      //   // Refresh the page or re-fetch data after deleting the resource
      //   router.refresh();
      //   setRefreshing(false);
      // handleModalClose();
      // } else {
      //   setErrorMessage(response.message || "Failed to add resources.");
      //   setSuccessMessage(null);
      //   setLoading(false);
      //   setRefreshing(false);
      // }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
      setRefreshing(false);
      setErrorMessage("An unexpected error occurred. Please try again.");
      setSuccessMessage(null);
      console.error(error);
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleModalClose = () => {
    if (!loading) {
      setIsOpen(false);
      setErrorMessage(null);
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation(); // Prevent the dropdown or parent element from closing
          handleModalOpen();
        }}
        className="bg-transparent p-0 m-0 min-w-0 text-danger text-lg"
      >
        <DeleteIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader>Delete Resource</ModalHeader>
          <ModalBody>
            {errorMessage && (
              <div className="bg-red-100 border border-red-500 text-black px-4 py-3 rounded-lg text-center">
                <p className="font-bold text-lg">Warning</p>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
            {successMessage && (
              <div className="bg-green-100 border border-green-500 text-black px-4 py-3 rounded-lg text-center">
                <p className="font-bold text-lg">Success</p>
                <p className="text-sm">{successMessage}</p>
              </div>
            )}
            <p>
              Are you sure you want to delete the resource{" "}
              <span className="font-bold ">{resourceName}</span>?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button color="danger" isLoading={loading} onClick={handleDelete}>
              {refreshing
                ? "Refreshing..."
                : loading
                ? "Deleting..."
                : "Delete"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
