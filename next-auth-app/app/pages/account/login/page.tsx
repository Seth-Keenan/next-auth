"use client";

import React, { useState } from 'react'
import { Navbar } from '@/app/components/Navbar'
import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'
import { loginManual, signInWithGithub, signInWithGoogle, signupManual } from "../../../../utils/supabase/supabaseClient"

const Login = () => {
  const [login, setLogin] = useState<boolean>(true)
  const [validFields, setValidFields] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")

  const [email, setEmail] = useState<string | null | undefined>(null)
  const [password, setPassword] = useState<string | null | undefined>(null)
  const [confPassword, setConfPassword] = useState<string | null | undefined>(null)
  
  async function handleLoginAuth(provider : string) {
    let data;
    let error;

    if (provider === "github") {
      ({data, error} = await signInWithGithub());
    }
    if (provider === "google") {
      ({data, error} = await signInWithGoogle());
    }
    if (error) {
      console.log("error: ", error)
    } else {
      console.log("data: ", data)
    }
  }

  async function handleManual() {
    validateFields();
    
    if(validFields) {
      if(login) {
        const { data, error } = await loginManual(email, password);
    
        if (error) {
          console.log("error: ", error)
        } else {
          console.log("data: ", data)
        }
      } else {
        const { data, error } = await signupManual(email, password);
 
        if (error) {
          console.log("error: ", error)
        } else {
          console.log("data: ", data)
        }
      }
    }
  }

  function validateFields () {
    setError(false);
    setValidFields(false);
    
    // Validate email
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log("email: ", email)
    console.log("password: ", password)
    console.log("confpassword: ", confPassword)

    if(email) {
      if(!validEmail.test(email)) {
        setErrorMessage("Your email is not valid.")
        setError(true)
      }
    } else {
      setErrorMessage("Please enter an email.")
      setError(true)
    }

    // Validate password
    if(password && password !== undefined) {
      if(password.length < 10) {
        setErrorMessage("Please create a password longer than 10 characters.")
        setError(true)
      }
    }

    // Validate confirm password
    if(!login && confPassword && confPassword !== undefined) {
      if(confPassword !== password) {
        setErrorMessage("Your passwords are different, please try again.")
        setError(true)
      }
    }

    // All cases passed
    if(!error) {
      setValidFields(true)
    }
  }

  return (
    <>
    <Navbar loginPage={true}/>
    <div className={'flex flex-col items-center justify-center h-screen gap-4'}>
      <div className={`text-5xl font-bold`}>
        {login ? "Login to Continue" : "Signup to Continue"}
      </div>

      {error && 
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {errorMessage}
        </div>
      }
      
      <div>
        <h2 className={`font-bold`}>Email</h2>
        <Input onChange={(e) => setEmail(e.target.value)} required={true} placeholder={`Email`} id={`email`}>
        </Input>
      </div>

      <div>
        <h2 className={`font-bold`}>Password</h2>
        <Input onChange={(e) => setPassword(e.target.value)} required={true} placeholder={`Password`} id={`password`}>
        </Input>
      </div>

      {!login &&
        <div>
          <h2 className={`font-bold`}>Confirm Password</h2>
          <Input onChange={(e) => setConfPassword(e.target.value)} required={true} placeholder={`Confirm Password`} id={`conf_password`}>
          </Input>
        </div>
      } 
        
      <Button onClick={() => {handleManual()}}>{login ? "Log In" : "Create Account"}</Button>
      
      <div className={`flex gap-2`}>
        <Button onClick={() => handleLoginAuth("github")}>Log in with GitHub</Button>
        <Button onClick={() => handleLoginAuth("google")}>Log in with Google</Button>
      </div>

      {/* TODO: Make a button link for this */}
      <Button onClick={() => setLogin(!login)}>{login ? "Don't have an account? Sign up" : "Switch to login"}</Button>
    </div>
    </>
  )
}

export default Login