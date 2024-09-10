import { model, models, Schema } from "mongoose";

interface ICustomer {
  name: string;
  area: string;
  phone: string;
  connectionSpeed: number;
  monthlyFee: number;
  connectionDate: string;
  dueAmount: number;
}

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  area: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  connectionSpeed: {
    type: Number,
    required: true,
  },

  connectionDate: {
    type: String,
    required: true,
  },

  monthlyFee: {
    type: Number,
    required: true,
  },

  dueAmount: {
    type: Number,
    required: true,
    default: 0,
  },
});

export const Customer =
  models.Customer ?? model<ICustomer>("Customer", customerSchema);
