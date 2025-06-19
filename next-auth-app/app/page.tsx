'use client';

import { Button } from "./components/Button";
import { Navbar } from "./components/Navbar";

import { signInWithGithub, signOut, getSession} from "../utils/supabase/supabaseClient"
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  // See if client is already logged in
  useEffect(() => {
    getSession().then(({ data }) => { setSession(data.session) })
  }, []);

  return (
    <>
      <Navbar isLoggedIn={session !== null}/>
      <div className={`flex flex-col items-center justify-center h-screen`}>
        <h1 className={`text-5xl`}>
          Next Chat
        </h1>
        {session  
        ?
        <>
          <p>You are logged in as {session.user.email}.</p>
          <Button onClick={() => signOut()}>Log out</Button>
        </>
        :
        <>
          <p>You are not logged in.</p>
          <Button onClick={() => handleLogin("github")}>Log in with GitHub</Button>
        </>
      }
      </div>
    </>
  );
}

async function handleLogin(provider : string) {
  let data;
  let error;

  if (provider === "github") {
    ({data, error} = await signInWithGithub());
  }

  if (error) {
    console.log("error: ", error)
  } else {
    console.log("data: ", data)
  }
}