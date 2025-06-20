'use client';

import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Button } from "./components/Button";
import { Navbar } from "./components/Navbar";
import { signOut, getSession} from "../utils/supabase/supabaseClient"
import { LinkButton } from "./components/LinkButton";

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
          <LinkButton href='/pages/account/login'>Log in here!</LinkButton>
        </>
      }
      </div>
    </>
  );
}