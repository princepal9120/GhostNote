import {z} from 'zod'

export const userValidation=z.string()
.min(2,"Username must be at least 2 characters")
.max(10,"Username must be at max 10 characters")
.regex(/^[a-zA-Z0-9_]+$/,"Username must be alphanumeric")

export const signUpSchema= z.object({
    username: userValidation,
    password: z.string().min(6, {message: "Password must be at least 6 characters"}),
    email: z.string().min(6, {message: "enter valid email"})
})