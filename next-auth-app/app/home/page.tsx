'use client';

import { Navbar } from '@/components/Navbar'
import { ChatCard } from '@/components/ChatCard'
import { getSession } from '@/utils/supabase/supabaseClient';
import { Session } from '@supabase/supabase-js';
import React, { useEffect, useRef, useState } from 'react'

const Home = () => {
  const [session, setSession] = useState<Session | null>(null);

    // See if client is already logged in
    useEffect(() => {
      getSession().then(({ data }) => { setSession(data.session) })
    }, []);
  
  return (
    <>
      <Navbar isLoggedIn={session === null}/>
      <ChatCard className={`relative top-[80px]`}>Text</ChatCard>
    </>
  )
}

export default Home