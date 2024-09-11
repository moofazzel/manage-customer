import TableUI from "@/components/TableUI";
import { getCustomers } from "@/queries/getCustomers";

export default async function Home() {
  const customers = await getCustomers();

  return (
    <section className="container">
      <TableUI customers={customers} />
    </section>
  );
}
