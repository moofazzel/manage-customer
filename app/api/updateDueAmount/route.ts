import dbConnect from "@/lib/mongodb";
import { Customer } from "@/model/customer-model";
import { NextResponse } from "next/server";

// This API route will handle updating due amounts for all customers
export async function POST() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Get today's date
    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();

    // Find all customers
    const customers = await Customer.find({});

    // Loop through each customer
    for (const customer of customers) {
      const connectionDate = new Date(customer.connectionDate);

      // Check if today matches the customer's connection date (day) and not the same month
      if (
        connectionDate.getDate() === currentDate &&
        connectionDate.getMonth() !== currentMonth
      ) {
        // Update the due amount by adding the monthly fee
        const newDueAmount = customer.dueAmount + customer.monthlyFee;

        // Update the customer record
        await Customer.updateOne(
          { _id: customer._id },
          { $set: { dueAmount: newDueAmount } }
        );

        console.log(
          `Updated due amount for ${customer.name} to ${newDueAmount}`
        );
      }
    }

    return NextResponse.json({ message: "Due amounts updated successfully" });
  } catch (error) {
    console.error("Error updating due amounts:", error);
    return NextResponse.json({ message: "Error updating due amounts" });
  }
}
