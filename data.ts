const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
  { name: "Paid", uid: "paid" },
  { name: "Pending", uid: "pending" },
];

const users = [
  {
    id: 1,
    name: "রনি",
    pendingPayment: 0,
    status: "active",
    age: "29",
  },
  {
    id: 2,
    name: "Zoey Lang",

    status: "paused",
    age: "25",
  },
  {
    id: 3,
    name: "Jane Fisher",

    status: "active",
    age: "22",
  },
  {
    id: 4,
    name: "William Howard",

    status: "vacation",
    age: "28",
  },
  {
    id: 5,
    name: "Kristen Copper",

    status: "active",
    age: "24",
  },
  {
    id: 6,
    name: "Brian Kim",

    age: "29",

    status: "Active",
  },
  {
    id: 7,
    name: "Michael Hunt",

    status: "paused",
    age: "27",
  },
  {
    id: 8,
    name: "Samantha Brooks",

    status: "active",
    age: "31",
  },
  {
    id: 9,
    name: "Frank Harrison",

    status: "vacation",
    age: "33",
  },
  {
    id: 10,
    name: "Emma Adams",

    status: "active",
    age: "35",
  },
  {
    id: 11,
    name: "Brandon Stevens",

    status: "active",
    age: "22",
  },
  {
    id: 12,
    name: "Megan Richards",

    status: "paused",
    age: "28",
  },
  {
    id: 13,
    name: "Oliver Scott",

    status: "active",
    age: "37",
  },
  {
    id: 14,
    name: "Grace Allen",

    status: "active",
    age: "30",
  },
  {
    id: 15,
    name: "Noah Carter",

    status: "paused",
    age: "31",
  },
  {
    id: 16,
    name: "Ava Perez",

    status: "active",
    age: "29",
  },
  {
    id: 17,
    name: "Liam Johnson",

    status: "active",
    age: "28",
  },
  {
    id: 18,
    name: "Sophia Taylor",

    status: "active",
    age: "27",
  },
  {
    id: 19,
    name: "Lucas Harris",

    status: "paused",
    age: "32",
  },
  {
    id: 20,
    name: "Mia Robinson",

    status: "active",
    age: "26",
  },
];

export { columns, statusOptions, users };
