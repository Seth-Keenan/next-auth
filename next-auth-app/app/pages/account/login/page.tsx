"use client";

import React, { useState } from 'react'
import { Navbar } from '@/app/components/Navbar'
import { Button } from '@/app/components/Button'
import { Input } from '@/app/components/Input'
import { signInWithGithub, signInWithGoogle } from "../../../../utils/supabase/supabaseClient"

const Login = () => {
  const [login, setLogin] = useState<boolean>(true)
  
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

  function handleLoginManual() {

  }

  return (
    <>
    <Navbar loginPage={true}/>
    <div className={'flex flex-col items-center justify-center h-screen gap-4'}>
      <div className={`text-5xl font-bold`}>
        {login ? "Login to Continue" : "Signup to Continue"}
      </div>

      <div>
        <h2 className={`font-bold`}>Email</h2>
        <Input required={true} placeholder={`Email`} >
        </Input>
      </div>

      <div>
        <h2 className={`font-bold`}>Password</h2>
        <Input required={true} placeholder={`Password`}>
        </Input>
      </div>

      {!login &&
        <div>
          <h2 className={`font-bold`}>Confirm Password</h2>
          <Input required={true} placeholder={`Confirm Password`}>
          </Input>
        </div>
      }

      {login 
      ? 
        <Button onClick={handleLoginManual}>Log In</Button>
      :
        <Button onClick={handleLoginManual}>Create Account</Button>
      }

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