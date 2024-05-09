'use client'
import { useToast } from '@/components/ui/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import {  useForm } from 'react-hook-form'
import * as z from 'zod'

function VerifyAccount() {
    const router=useRouter()
    const params=useParams<{username: string}>
    const {toast}= useToast()
    const form =useForm<z.infer <typeof verifySchema>>({
        resolver: zodResolver(verifySchema)})
        const onSubmit =async (data: z.infer<typeof verifySchema >)=>{
          try {
              const response= axios.post (`/api/verify-code`,{username:params.username,
                  code: data.code}
              )
          
                toast({
                    title: "Success",
                    description: response.data.message
                })
                router.replace('/sing-in')
          } catch (error) {
            console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;


      // Default error message
     
      ('There was a problem with your sign-up. Please try again.');

      toast({
        title: 'Sign Up Failed',
        description: axiosError.response?.data.message,
        variant: 'default',
      });


          }
        }
    
  return (
    <div className='flex justify-center items-center min-h-screen bg-red-100'
    ><div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className='text-center'>
            <h1
            className=' text-4xl font-extrabold tracking-tight lg:text-5xl mb-4'>verify your account
                </h1>
                <p>
                    Enter the verification code sent to your email
                </p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
           
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div></div>
  )
}

export default VerifyAccount