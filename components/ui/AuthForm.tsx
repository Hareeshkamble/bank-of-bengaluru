"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Router } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { getLoggedInUser, signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";


const formSchema = (type:string)=>z.object({
// for signUp type 
  firstName: type === "sign-in" ? z.string().optional():  z.string().min(3),
  lastName: type ===  "sign-in" ? z.string().optional(): z.string().min(3),
  address1: type === "sign-in" ? z.string().optional():  z.string().max(50),
  city: type === "sign-in" ? z.string().optional():  z.string().max(50),

  state: type === "sign-in" ? z.string().optional():  z.string().min(2).max(3),
  postalCode: type === "sign-in" ? z.string().optional():  z.string().min(3).max(6),
  dateOfBirth: type === "sign-in" ? z.string().optional():  z.string().min(3),
  ssn: type ===  "sign-in" ? z.string().optional(): z.string().min(3),
  // for both
  email: z.string().email(),
  password: z.string().min(8),
});

function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const formSchemalmao = formSchema(type)
  let router=useRouter()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchemalmao>>({
    resolver: zodResolver(formSchemalmao),
    defaultValues: {
      email: "",
      password: "",
    },
    
  });

  // 2. Define a submit handler.
const onSubmit=async(data: z.infer<typeof formSchemalmao>) =>{
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    setLoading(true);
   try {
     if(type === "sign-up"){
      const userData={
        firstName:data.firstName!,
        lastName:data.lastName!,
        address1:data.address1!,
        city:data.city!,
        state:data.state!,
        postalCode:data.postalCode!,
        dateOfBirth:data.dateOfBirth!,
        ssn:data.ssn!,
        email:data.email,
        password:data.password
      }

      const newUser= await signUp(userData);
      setUser(newUser)
    }
    
    if(type === "sign-in"){
      const response = await signIn({
        email:data.email,
        password:data.password,
      })
      if(response)router.push("/")
    }
   } catch (error) {
    toast.error("error")
   }finally{
    setLoading(false);
    toast.success("success")

   }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            draggable="false"
            alt="bob logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold  text-black-1">
            B_O_B
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link Your Account to get Started"
                : "Please enter your Details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (

        <div className="flex flex-col gap-4">

          {/*{PlaidLINK} */}
          <PlaidLink user={user} variant="primary"/>
          
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                <div className="flex gap-4">

            
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">First Name</FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="First Name"
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">Last Name</FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="Last Name"
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
    </div>
                  {/* Address */}
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">Address</FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="Enter Your Address"
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />

<FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">City</FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="Enter Your City"
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  {/* State */}
                  <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">State</FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="State"
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />

                  {/* Code */}
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <div className="form-item">
                        <FormLabel className="form-label">
                          Postal Code
                        </FormLabel>
                        <div className="flex w-full flex-col ">
                          <FormControl>
                            <Input
                              placeholder="Example: 111-111 "
                              className="input-class"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="form-message mt-2" />
                        </div>
                      </div>
                    )}
                  />
                  </div>

                  {/* DOb */}
                  <div className="flex gap-4">
                  <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Date Of Birth</FormLabel>
                    <div className="flex w-full flex-col ">
                      <FormControl>
                        <Input
                          placeholder="YYYY-MM-DD"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              {/* SSN */}
              <FormField
                control={form.control}
                name="ssn"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">SSN</FormLabel>
                    <div className="flex w-full flex-col ">
                      <FormControl>
                        <Input
                          placeholder="Example: 1234"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              </div>
                </>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Email</FormLabel>
                    <div className="flex w-full flex-col ">
                      <FormControl>
                        <Input
                          placeholder="Johndoe@gmail.com"
                          className="input-class"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">Password</FormLabel>
                    <div className="flex w-full flex-col ">
                      <FormControl>
                        <Input
                          placeholder="enter your password"
                          className="input-class"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="form-message mt-2" />
                    </div>
                  </div>
                )}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1 ">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account yet?"
                : "Already have an account?"}
            </p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"}>
              {type === "Sign-in" ? "Sign-in" : "Sign-up"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
}

export default AuthForm;
