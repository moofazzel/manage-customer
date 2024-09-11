"use client";

import { createCustomer } from "@/actions/customers";
import { PlusIcon } from "@/components/icons/PlusIcon";
import {
  Button,
  DatePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ViewCustomerModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
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
        scrollBehavior="inside"
      >
        <ModalContent>
          <form>
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
                  label="মাসিক ফি"
                  radius="sm"
                  isRequired
                  required
                />

                <DatePicker
                  name="connectionDate"
                  label="সংযোগ তারিখ"
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
