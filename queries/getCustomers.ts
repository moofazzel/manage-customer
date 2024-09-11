import { replaceMongoIdInArray } from "@/lib/convertData";
import dbConnect from "@/lib/mongodb";
import { Customer } from "@/model/customer-model";

export async function getCustomers() {
  await dbConnect();
  const customers = await Customer.find({}).lean();

  return replaceMongoIdInArray(customers);
}
