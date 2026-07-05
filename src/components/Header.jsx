import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LinkIcon, LogOut } from 'lucide-react';
import { UrlState } from '../Context';
import useFetch from '../hooks/Use-fetch';
import { BarLoader } from 'react-spinners';
import { logout } from "../db/apiAuth";

const Header = () => {
    const navigate = useNavigate()
   
const {user,fetchUser}=UrlState()
const {loading,fn:fnLogout} = useFetch(logout)
  return( 
    <>
  <nav className='py-4 flex justify-between items-center'>
    <Link to='/'>
    <img src="/logo (2).png" className='h-16' alt='SnapLink logo' />
    </Link>
  
  <div>
    {!user ?
<Button onClick = {() => navigate("/Auth")}>Login</Button>
    :(
        <DropdownMenu>
  <DropdownMenuTrigger asChild className="w-10 rounded-full overflow-hidden">
    <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
      <Avatar>
        <AvatarImage src={user?.user_metadata?.profile_pic} className="object-contain" />
        <AvatarFallback>LM</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>

  <DropdownMenuContent align="end">
    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>

    <DropdownMenuSeparator />

    <DropdownMenuGroup>
      
      <DropdownMenuItem>
        <Link to="/Dashboard " className='flex' >
        <LinkIcon className='mr-2 h-4 w-4'/>
        My Links
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem className="text-red-400">
        <LogOut className='mr-2 h-4 w-4'/>
        <span onClick = {()=>{
            fnLogout().then(()=>{
                fetchUser()
                navigate("/")
            })
            navigate("/");
        }}>
Logout
        </span>
        
        </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
    )

}
  
  </div>
  </nav>
  {loading && <BarLoader className='mb-4' width= {"100%"} color = "#36d7b7"/>}
  </>
  
  )
}

export default Header