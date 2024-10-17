"use client"
import { useRouter } from 'next/navigation';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoginBodyType, LoginBody } from "@/app/schemaValidations/auth.schema";
import envConfig from "@/config"

const LoginForm = () => {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    // console.log(values);
    const response = await fetch(`${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
    console.log('check response =>', response);
    if (response.data) {
      router.push('/');
    } else {
      const errors = response.errors;
      errors.forEach((error: any) => {
        form.setError(error.field, {
          type: 'server',
          message: error.message
        })
      });
    }
  }

  return (
    <>
      <div className="flex justify-center max-w-[750px] mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</Button>
          </form>
        </Form>
      </div>
    </>
  )
}
export default LoginForm;