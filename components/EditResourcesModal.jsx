"use client";

import { EditIcon } from "@/components/icons/EditIcon";
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
import { useState } from "react";

import { updateResourceToSheet } from "@/actions/resources/updateResourceToSheet";
import { getLocalTimeZone, parseDate } from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { useRouter } from "next/navigation";

export default function EditResourcesModal({ buttonText, resourceData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const router = useRouter();

  // Function to convert "1 May 2024" to "2024-05-01"
  const convertToDateFormat = (dateStr) => {
    const dateParts = dateStr.split(" ");
    const day = String(dateParts[0]).padStart(2, "0");
    const month = new Date(`${dateParts[1]} 1, 2000`).getMonth() + 1;
    const year = dateParts[2];
    return `${year}-${String(month).padStart(2, "0")}-${day}`;
  };

  let formateDate;
  if (resourceData.dateHired) {
    formateDate = parseDate(convertToDateFormat(resourceData?.dateHired));
  }

  const [formattedDate, setFormattedDate] = useState(formateDate);

  let formatter = useDateFormatter({ dateStyle: "full" });

  const updateResource = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      // Make the API call to write the data to Google Sheets
      const response = await updateResourceToSheet(formData);

      if (response.status === 200) {
        setSuccessMessage("Resource successfully updated.");

        setLoading(false);
        setRefreshing(true);

        // Simulate a delay for page refresh
        await new Promise((resolve) => setTimeout(resolve, 6000)); // 6-second delay

        router.refresh();

        setRefreshing(false);

        handleModalClose();
      } else {
        console.error("Failed to add resources:", response);
        setErrorMessage(response.message || "Failed to add resources.");
        setSuccessMessage(null);
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      setLoading(false);
      setRefreshing(false);
      setSuccessMessage(null);
      setErrorMessage("An unexpected error occurred. Please try again.");
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
        className="bg-transparent p-0 m-0 min-w-0 text-lg"
      >
        <EditIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={handleModalClose}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
      >
        <ModalContent>
          <form onSubmit={updateResource}>
            <ModalHeader>Update Resource</ModalHeader>
            <ModalBody className="max-h-[35rem]">
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

              <div className="flex flex-col gap-3">
                <Input
                  defaultValue={resourceData?.resource}
                  name="resourceName"
                  type="text"
                  label="Name"
                  radius="sm"
                  readOnly
                  required
                />

                <Input
                  defaultValue={resourceData?.category}
                  name="category"
                  type="text"
                  label="Category"
                  radius="sm"
                  isRequired
                  required
                />

                <Input
                  defaultValue={resourceData?.totalMaxCapacity}
                  min="5"
                  max="100"
                  step="5"
                  name="totalMaxCapacity"
                  type="number"
                  label="Total Max Capacity (%)"
                  radius="sm"
                  isRequired
                  required
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (value < 5) {
                      e.target.value = 5;
                    } else if (value > 100) {
                      e.target.value = 100;
                    }
                  }}
                />

                <DatePicker
                  name="hireDate"
                  label="Hire Date"
                  radius="sm"
                  value={formattedDate}
                  onChange={setFormattedDate}
                />
                <p className="text-default-500 text-sm">
                  Selected date:{" "}
                  {formattedDate
                    ? formatter.format(formattedDate.toDate(getLocalTimeZone()))
                    : "--"}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button
                // Enable only if changes are made
                type="submit"
                color="primary"
                isLoading={refreshing || loading}
              >
                {refreshing ? "Refreshing..." : loading ? "Adding..." : "Add"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
