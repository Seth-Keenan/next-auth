"use client";

import React, { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { loginManual, signInWithGithub, signInWithGoogle, signupManual } from "../../../utils/supabase/supabaseClient"

const Login = () => {
  const [login, setLogin] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [valid, setValid] = useState<boolean>(false);

  const [email, setEmail] = useState<string | null | undefined>(null)
  const [password, setPassword] = useState<string | null | undefined>(null)
  const [confPassword, setConfPassword] = useState<string | null | undefined>(null)
  
  function clearInputs() {
    setEmail("");
    setPassword("");
    setConfPassword("");

    const emailInput = document.getElementById('email') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    const confirmInput = document.getElementById('conf_password') as HTMLInputElement | null;

    if (emailInput) emailInput.value = "";
    if (passwordInput) passwordInput.value = "";
    if (confirmInput) confirmInput.value = "";
  }


  async function handleLoginAuth(provider : string) {
    setError(false);
    
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
      window.location.replace("/home");
    }
  }

  async function handleManual() {
    setError(false);
    setValid(false);
    
    if(validateFields()) {
      if(login) {
        const { data, error } = await loginManual(email, password);
    
        if (error) {
          setErrorMessage(`${error.message}.`)
          setError(true) 
        } else {
          console.log("data: ", data)
          window.location.replace("/home");
        }

      } else {
        const { data, error } = await signupManual(email, password);
 
        if (error) {
          setErrorMessage(`${error.message}.`)
          setError(true)
        } else {
          console.log("data: ", data)
          setLogin(!login)
        }
      }
    }
  }

  function validateFields(): boolean {
    setError(false);
    
    // Validate email
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate Email
    if(email) {
      if(!validEmail.test(email)) {
        setErrorMessage("Your email is not valid.")
        setError(true)
        return false;
      }
    } else {
      setErrorMessage("Please enter an email.")
      setError(true)
      return false;
    }

    // Validate password
    if(password && password !== undefined) {
      if(password.length < 10) {
        setErrorMessage("Please create a password longer than 10 characters.")
        setError(true)
        return false;
      }
    }

    // Validate confirm password
    if(!login && confPassword && confPassword !== undefined) {
      if(confPassword !== password) {
        setErrorMessage("Your passwords are different, please try again.")
        setError(true)
        return false;
      }
    }

    setValid(true);
    return true;
  }

  return (
    <>
    <Navbar loginPage={true}/>
    <div className={'flex flex-col items-center justify-center h-screen gap-4'}>
      <div className={`text-5xl font-bold`}>
        {login ? "Login to Continue" : "Signup to Continue"}
      </div>

      {error && 
        <div className={`bg-red-500 text-white px-4 py-2 rounded shadow-lg z-50`}>
          {errorMessage}
        </div>
      }
      
      {(!login && valid) &&
        <div className={`bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50`}>
          Please go to your email to confirm your sign up.
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
      <Button onClick={() => {setLogin(!login); setValid(false); clearInputs(); setError(false)}}>{login ? "Don't have an account? Sign up" : "Switch to login"}</Button>
    </div>
    </>
  )
}

export default Login