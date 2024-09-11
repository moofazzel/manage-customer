"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";

type Customer = {
  id: string;
  name: string;
  area: string;
  phone: string;
  connectionSpeed: string;
  monthlyFee: string;
  dueAmount: string;
  connectionDate: string;
};

export default function ViewCustomerModal({
  customerData,
}: {
  customerData: Customer;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleModalOpen} className="bg-blue-100">
        {customerData?.name}{" "}
        <small className="text-default-500"> ({customerData?.area})</small>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          <form>
            <ModalHeader> গ্রাহকের ডিটেলস</ModalHeader>
            <ModalBody className="max-h-[35rem] pb-10">
              <div className="flex flex-col gap-3">
                <Input
                  name="name"
                  type="text"
                  label="নাম"
                  radius="sm"
                  defaultValue={customerData?.name}
                  readOnly
                />

                <Input
                  name="area"
                  type="text"
                  label="এলাকা"
                  radius="sm"
                  defaultValue={customerData?.area}
                  readOnly
                />

                <Input
                  label="মোবাইল নাম্বার"
                  name="phone"
                  type="tel"
                  pattern="(\+8801|01)[0-9]{9}"
                  placeholder="XXXXXXXXX"
                  radius="sm"
                  defaultValue={customerData?.phone}
                  readOnly
                />

                <Input
                  name="connectionSpeed"
                  type="number"
                  label="স্পিড (Mbps)"
                  radius="sm"
                  defaultValue={customerData?.connectionSpeed}
                  readOnly
                />

                <Input
                  name="monthlyFee"
                  type="number"
                  label="মাসিক চার্জ"
                  radius="sm"
                  defaultValue={customerData?.monthlyFee}
                  readOnly
                />
                <Input
                  name="monthlyFee"
                  type="date"
                  label="সংযোগ তারিখ"
                  radius="sm"
                  defaultValue={customerData?.connectionDate}
                  readOnly
                />
              </div>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
