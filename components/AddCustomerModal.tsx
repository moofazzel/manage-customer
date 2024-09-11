"use client";

import { createCustomer } from "@/actions/customers";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
  Button,
  Checkbox,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

export default function AddCustomerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [isPaid, setIsPaid] = useState(false);

  const addCustomer = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const formData = new FormData(event.currentTarget);

    const newFormData = {
      name: formData.get("name"),
      area: formData.get("area"),
      phone: formData.get("phone"),
      connectionSpeed: formData.get("connectionSpeed"),
      monthlyFee: formData.get("monthlyFee"),
      monthlyPaid: isPaid,
      connectionDate: formData.get("connectionDate"),
    };

    try {
      // Make the API call to create new customer
      const response = await createCustomer(newFormData);

      setSuccessMessage(response.message);

      if (response.status === 200) {
        setSuccessMessage(response.message);
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
        onClick={handleModalOpen}
        color="primary"
        endContent={<PlusIcon />}
      >
        নতুন গ্রাহক
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        isKeyboardDismissDisabled={true}
        scrollBehavior="normal"
      >
        <ModalContent>
          <form onSubmit={addCustomer}>
            <ModalHeader> নতুন সংযোগ</ModalHeader>
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
                <Input
                  name="name"
                  type="text"
                  label="নাম"
                  radius="sm"
                  isRequired
                  required
                />

                <Input
                  name="area"
                  type="text"
                  label="এলাকা"
                  radius="sm"
                  isRequired
                  required
                />

                <Input
                  label="মোবাইল নাম্বার"
                  name="phone"
                  type="tel"
                  pattern="(\+8801|01)[0-9]{9}"
                  placeholder="XXXXXXXXX"
                  radius="sm"
                  isRequired
                  required
                />

                <Input
                  name="connectionSpeed"
                  type="number"
                  label="স্পিড (Mbps)"
                  radius="sm"
                  isRequired
                  required
                />

                <Input
                  name="monthlyFee"
                  type="number"
                  label="মাসিক চার্জ"
                  radius="sm"
                  isRequired
                  required
                />

                <Checkbox
                  name="monthlyPaid"
                  onChange={() => setIsPaid(!isPaid)}
                >
                  মাসিক চার্জ পরিশোধ করেছে
                </Checkbox>

                <DatePicker
                  name="connectionDate"
                  label="সংযোগ তারিখ"
                  radius="sm"
                />
              </div>
            </ModalBody>
            <ModalFooter className="pb-5">
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
