import {Button} from "./ui/button"
import {useNavigate} from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {LogOut, LinkIcon} from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import {logout} from "@/db/apiAuth";

import {UrlState} from "@/context";
import {BarLoader} from "react-spinners";


const Header = () => {
  const navigate = useNavigate(); 
   
 const {user, fetchUser} = UrlState()
 const {loading, fn: fnLogout} =useFetch(logout);

  return ( 
    <>
    <nav className="py-4 flex justify-between items-center">
      <a href="/">
            <img src="/logo.jpg" className="h-16" alt=" url-shortner logo" /> 
            </a>
             <div>
          {!user? (
            <Button onClick={()=> navigate("/auth")} >Login</Button>)
          :(
            <DropdownMenu>
  <DropdownMenuTrigger className="w-10 rounded-full overflow-hidden">
    <Avatar>
  <AvatarImage src={user?.user_metadata?.profile_pic}  className="object-contain" />
  <AvatarFallback>RS</AvatarFallback>
</Avatar>
</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
    <a href="/dashboard" className="flex">
      <LinkIcon className="mr-2 h-4 w-4" /><span>Links</span></a></DropdownMenuItem> 
    <DropdownMenuItem className="bg-red-400">
      <LogOut className="mr-2 h-4 w-4" />
    <span 
    onClick={()=>{
      fnLogout().then(()=>{
        fetchUser();
      navigate("/auth");
      })
    }}
     >
      Logout
      </span>
      </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
)}
      </div>

    </nav>  
    {loading && <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />}

    </>
  )
}

export default Header;