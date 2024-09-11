"use server";

import { Customer } from "@/model/customer-model";
import { revalidatePath } from "next/cache";

type Customer = {
  name: string;
  area: string;
  phone: string;
  connectionSpeed: number;
  monthlyFee: number;
  monthlyPaid: boolean;
  connectionDate: string;
};

export async function createCustomer(customerData: Customer) {
  try {
    const existingCustomer = await Customer.findOne({
      phone: customerData.phone,
    });

    if (existingCustomer) {
      return {
        status: 500,
        message: "এই ফোন নম্বরটি ইতিমধ্যেই ব্যবহৃত হয়েছে",
      };
    }

    const newCustomer = new Customer({
      ...customerData,
      dueAmount: customerData.monthlyPaid ? 0 : customerData.monthlyFee,
    });
    await newCustomer.save();
    revalidatePath("/");
    return {
      status: 200,
      message: "গ্রাহক তৈরি হয়েছে",
    };
  } catch (error) {
    return {
      status: 500,
      message: "গ্রাহক তৈরির সময় একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন",
    };
  }
}

export async function updateCustomerPayment(paymentData: {
  id: string;
  paymentAmount: number;
}) {
  try {
    const existingCustomer = await Customer.findOne({
      _id: paymentData.id,
    });

    if (!existingCustomer) {
      return {
        status: 500,
        message: "গ্রাহক পাওয়া যায়নি",
      };
    }

    // Update the dueAmount
    await Customer.findOneAndUpdate(
      { _id: paymentData.id },
      {
        $set: {
          dueAmount: existingCustomer.dueAmount - paymentData.paymentAmount,
        },
      },
      { new: true }
    );

    revalidatePath("/");

    return {
      status: 200,
      message: "পেমেন্ট সম্পন্ন হয়েছে",
    };
  } catch (error) {
    console.error("Error updating customer payment:", error);
    return {
      status: 500,
      message: "একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন",
    };
  }
}

export async function deleteCustomer(id: { id: string }) {
  console.log(id);
  try {
    const existingCustomer = await Customer.findOne({
      _id: id,
    });

    if (!existingCustomer) {
      return {
        status: 500,
        message: "গ্রাহক পাওয়া যায়নি",
      };
    }

    // delete the customer
    await Customer.deleteOne({ _id: id });

    revalidatePath("/");

    return {
      status: 200,
      message: "ডিলিট সম্পন্ন হয়েছে",
    };
  } catch (error) {
    console.error("Error updating customer payment:", error);
    return {
      status: 500,
      message: "একটি ত্রুটি ঘটেছে। আবার চেষ্টা করুন",
    };
  }
}
