const { z } = require("zod");

const checkoutSchema = z.object({
  shippingAddress: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(4, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(10, "Phone number is required"),
  }),
  paymentMethod: z.string(),
  checkoutItems: z.array(z.any()), // Adjust this if you have a strict product schema
  totalPrice: z.number(),
});

module.exports = checkoutSchema;
