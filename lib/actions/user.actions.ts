"use server"

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";
import toast from "react-hot-toast";

export const signIn=async({email,password}:signInProps)=>{
    try {
      const  {account}  = await createAdminClient();

        let response= await account.createEmailPasswordSession(email,password);
        return parseStringify(response);
    } catch (error) {
        console.log("error", error);
    }
}

export const signUp=async(userData:SignUpParams)=>{
    const {email, firstName,lastName, password} = userData
    try {
        // create a App Write
        const { account } = await createAdminClient();
   
  const newUserAccount =  await account.create(
    ID.unique(),
    email, 
    password, 
     `${firstName} ${lastName}`
     );
  const session = await account.createEmailPasswordSession(email, password);

  cookies().set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return  parseStringify(newUserAccount)

    } catch (error) {
        console.log("error", error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user= await account.get();
      return parseStringify(user)
    } catch (error) {
      return null;
    }
  }

  export const logoutAccount=async()=>{
    try {
      const { account } = await createSessionClient();
      cookies().delete("appwrite-session")
      await account.deleteSession("current")
      
    } catch (error) {
      return null

    }
  }
  