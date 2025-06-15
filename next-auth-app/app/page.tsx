'use client';

import { Button } from "./components/Button";
import { Navbar } from "./components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {

  const { data: session, status } = useSession();
  
  const isLoggedIn = status === "authenticated";
  
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn}/>
      <div className={`flex flex-col items-center justify-center h-screen`}>
        <h1 className={`text-5xl`}>
          Next Chat
        </h1>
        {isLoggedIn  
        ?
        <>
          <p>You are logged in as {session?.user?.name}.</p>
          <Button onClick={() => signOut({ callbackUrl: "/" })}>Log out</Button>
        </>
        :
        <>
          <p>You are not logged in.</p>
          <Button onClick={() => signIn("github", { redirectTo: "/" })}>Log in with GitHub</Button>
          <Button onClick={() => signIn("google", { redirectTo: "/" })}>Log in with Google</Button>
        </>
      }
      </div>
    </>
  );
}
