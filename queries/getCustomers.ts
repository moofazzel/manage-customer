import { replaceMongoIdInArray } from "@/lib/convertData";
import { Customer } from "@/model/customer-model";

export async function getCustomers() {
  const customers = await Customer.find({}).lean();

  return replaceMongoIdInArray(customers);
}
