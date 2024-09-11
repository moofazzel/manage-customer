const columns = [
  { name: "আইডি", uid: "id", sortable: true },
  { name: "নাম", uid: "name", sortable: true },
  { name: "হিসাব", uid: "status", sortable: true },
  { name: "অ্যাকশন", uid: "actions" },
];

const statusOptions = [
  { name: "পরিশোধ", uid: "paid" },
  { name: "এই মাস বাকি", uid: "warning" },
  { name: "এক মাসের বেশি", uid: "pending" },
];

export { columns, statusOptions };
