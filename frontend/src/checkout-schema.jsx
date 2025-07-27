import { z } from "zod";

const checkoutSchema = z.object({
  email: z.string().email("Invalid email"),
  shippingAddress: z.object({
    firstName: z.string().min(3, "First name is required at least 3 words"),
    lastName: z.string().min(3, "Last name is required at least 3 words"),
    address: z.string().min(9, "Address is required at least 9 words"),
    city: z.string().min(3, "City is required at least 3 words"),
    postalCode: z.string().regex(/^\d{6}$/, {
      message: "Phone number must be exactly 10 digits",
    }),
    country: z.string().min(1, "Country is required"),
    phone: z.string().regex(/^\d{10}$/, {
      message: "Phone number must be exactly 10 digits",
    }),
  }),
});

export default checkoutSchema;
