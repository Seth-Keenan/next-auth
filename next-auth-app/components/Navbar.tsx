import React from 'react'
import { LinkButton } from './LinkButton'
import { signOut } from "@/utils/supabase/supabaseClient";

interface NavbarProps {
    isLoggedIn?: boolean,
    loginPage?: boolean,
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, loginPage }) => {
  return (
    <nav className={'fixed w-full h-20 shadow-xl'}>
        {!isLoggedIn 
        ?
            <div className={'flex justify-between items-center h-full w-full px-4 2xl:px-16'}>
                <div>
                    <LinkButton href='https://github.com/Seth-Keenan'>About</LinkButton>
                </div>
                {loginPage 
                ?
                    <div>
                        <LinkButton href='/'>Home</LinkButton>
                    </div>
                :
                    <div>
                        <LinkButton href='/account/login'>Login</LinkButton>
                    </div>
                }
            </div>
        :
            <div className={'flex justify-between items-center h-full w-full px-4 2xl:px-16'}>
                <div>
                    <LinkButton href='https://github.com/Seth-Keenan'>About</LinkButton>
                </div>
                <div>
                    <LinkButton onClick={() => signOut()}>Logout</LinkButton>
                </div>
            </div>
        }
    </nav>
  )
}