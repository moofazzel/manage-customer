import TableUI from "@/components/TableUI";
import { getCustomers } from "@/queries/getCustomers";

export default async function Home() {
  const customers = await getCustomers();
  console.log("🚀 ~ user:", customers);

  return (
    <section className="container">
      <TableUI customers={customers} />
    </section>
  );
}
