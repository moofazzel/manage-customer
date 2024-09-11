"use client";

import { updateCustomerPayment } from "@/actions/customers";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

export default function UpdatePaymentModal({ customerData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addCustomer = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);

    const newFormData = {
      id: customerData.id,
      paymentAmount: formData.get("paymentAmount"),
    };

    try {
      // Make the API call to create new customer
      const response = await updateCustomerPayment(newFormData);

      setSuccessMessage(response.message);

      if (response.status === 200) {
        setSuccessMessage("Resource successfully added.");
        setLoading(false);
        handleModalClose();
      } else if (response.status === 500) {
        setErrorMessage(response.message);
        setSuccessMessage(null);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      setSuccessMessage(null);
      console.error(error);
    }
  };

  const handleModalOpen = () => {
    setIsOpen(true);
    setErrorMessage(null);
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
        className=" p-0 m-0"
        onClick={handleModalOpen}
        isIconOnly
        size="sm"
        variant="flat"
        color="primary"
        endContent={<PlusIcon />}
      ></Button>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          <form onSubmit={addCustomer}>
            <ModalHeader> পেমেন্ট আপডেট করুন</ModalHeader>
            <ModalBody className="max-h-[35rem]">
              {errorMessage && (
                <div className="bg-red-100 border border-red-500 text-black px-4 py-3 rounded-lg text-center">
                  <p className="font-bold text-lg">সতর্কতা</p>
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}

              {successMessage && (
                <div className="bg-green-100 border border-green-500 text-black px-4 py-3 rounded-lg text-center">
                  <p className="font-bold text-lg">সফল</p>
                  <p className="text-sm">{successMessage}</p>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <div className="flex gap-5">
                  <Input
                    defaultValue={customerData?.name}
                    readOnly
                    name="name"
                    type="text"
                    label="নাম"
                    radius="sm"
                  />

                  <Input
                    defaultValue={customerData?.area}
                    readOnly
                    name="area"
                    type="text"
                    label="এলাকা"
                    radius="sm"
                  />
                </div>

                <Input
                  defaultValue={customerData?.monthlyFee}
                  readOnly
                  name="monthlyFee"
                  type="number"
                  label="মাসিক ফি"
                  radius="sm"
                />

                <Input
                  isRequired
                  name="paymentAmount"
                  type="number"
                  label="পেমেন্ট পরিমান"
                  radius="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={handleModalClose}>
                বাতিল
              </Button>
              <Button
                // Enable only if changes are made
                type="submit"
                color="primary"
                isLoading={loading}
              >
                {loading ? "সাবমিট করা হচ্ছে..." : "সাবমিট"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
