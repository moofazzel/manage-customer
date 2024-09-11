"use client";

import { deleteCustomer } from "@/actions/customers";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import { DeleteIcon } from "./icons/DeleteIcon";
type Customer = {
  id: string;
  name: string;
  area: string;
  phone: string;
  connectionSpeed: number;
  monthlyFee: number;
  dueAmount: number;
  connectionDate: string;
};

export default function DeleteResourceModal({
  customerData,
}: {
  customerData: Customer;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [successMessage, setSuccessMessage] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await deleteCustomer(customerData?.id);
      if (response.status === 200) {
        setSuccessMessage(response.message);
        setLoading(false);
        handleModalClose();
      } else {
        setErrorMessage(response.message);
        setSuccessMessage(null);
        setLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
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
        scrollBehavior="normal"
      >
        <ModalContent>
          <ModalHeader>গ্রাহক ডিলিট করুন</ModalHeader>
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
              আপনি কি নিশ্চিত এই গ্রাহককে ডিলিট করতে চান{" "}
              <span className="font-bold ">{customerData?.name}</span>?
              <small>নিশ্চিত করলে গ্রাহকের সব ডাটা মুছে যাবে । </small>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="bordered"
              onClick={handleModalClose}
            >
              বাদ দিন
            </Button>
            <Button color="danger" isLoading={loading} onClick={handleDelete}>
              {loading ? "ডিলিট করা হচ্ছে..." : "হ্যাঁ চাই"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
