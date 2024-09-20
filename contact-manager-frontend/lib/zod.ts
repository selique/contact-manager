import { boolean, number, object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

export const signUpSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  isAdmin: boolean().optional(),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
  confirmPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});

export const contactSchema = object({
    name: string({ required_error: "Name is required" })
    .min(1, "Name is required"),
    address: string({ required_error: "Address is required" })
    .min(1, "Address is required"),
    phone: string({ required_error: "Phone is required" })
    .min(8, "Phone is required"),
    email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"), 
})

export const updateContactSchema = object({
    name: string({ required_error: "Name is required" })
    .min(1, "Name is required"),
    address: string({ required_error: "Address is required" })
    .min(1, "Address is required"),
    phone: string({ required_error: "Phone is required" })
    .min(8, "Phone is required"),
    email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"), 
    id: number({ required_error: "Id is required" })
})

export const deleteContactSchema = object({
    id: number({ required_error: "Id is required" })
})