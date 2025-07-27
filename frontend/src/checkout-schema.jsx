import { z } from "zod"; 

const checkoutSchema = z.object({
  email: z.string().email("Invalid email"),
  shippingAddress: z.object({
    firstName: z.string().min(3, "First name is required at least 3 words"),
    lastName: z.string().min(3, "Last name is required at least 3 words"),
    address: z.string().min(9, "Address is required at least 9 words"),
    city: z.string().min(3, "City is required at least 3 words"),
    postalCode: z.number().min(6, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.number().min(10, "Phone number is required"),
  }),
});

export default checkoutSchema; 
