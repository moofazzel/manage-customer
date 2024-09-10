"use server";

import { Customer } from "@/model/customer-model";

type Customer = {
  name: string;
  area: string;
  phone: string;
  connectionSpeed: number;
  monthlyFee: number;
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
      dueAmount: customerData.monthlyFee,
    });
    await newCustomer.save();
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
