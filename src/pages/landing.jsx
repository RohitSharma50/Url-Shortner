import {useState} from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
 import {useNavigate} from "react-router-dom"

const LandingPage = () => { 

    const [longUrl, setLongUrl]=useState();
    const navigate = useNavigate();

      const handleShorten =(e) =>{
        e.preventDefault()
        if(longUrl)navigate(`/auth?createNew=${longUrl}`);
      }
    
  
  return (
    <div className ="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">The only Url-Shortner you will need</h2>
     <form  onSubmit={handleShorten} className="sm:h-12 flex flex-col sm:flex-row w-full md:w-2/4 gap-2">
      <Input type="url" placeholder="Enter your looong Url" 
      onChange={(e)=> setLongUrl(e.target.value)}
      className="h-full flex-1 py-4 px-4" />
      <Button className="h-full" 
       type="submit" variant="destructive">
      Shorten This
      </Button>
     </form> 
     <div className="flex flex-row items-center   max-2xl:flex-col ">
     <img src="/banner.png" alt="banner" className="w-1/2  my-10 mx-5 sm:*:items-center  " />
     
     <Accordion type="multiple" collapsible="true" className="my-10 mx-5">

     <AccordionItem value="item-1">
    <AccordionTrigger>what is the use of short Url ?</AccordionTrigger>
    <AccordionContent>
    A short URL is used to make long and complex web addresses more manageable and easier to share. 
    It reduces the character count, which is especially useful on platforms with character limits like Twitter.
     Additionally, short URLs can make links look cleaner and more user-friendly.    </AccordionContent>
  </AccordionItem>


  <AccordionItem value="item-2">
    <AccordionTrigger>How does this URL shortener works?</AccordionTrigger>
    <AccordionContent>
    This URL shortener takes a long URL as input and generates a shorter, unique URL and Unique QR code for Every Url. 
    When a user clicks on the shortened URL, they are redirected to the original long URL.    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-3">
    <AccordionTrigger>Why to make an account on this website / What is so special about this Url Shortener?</AccordionTrigger>
    <AccordionContent>
    Unlike basic URL shorteners, this one provides advanced analytics that help users understand their audience better. 
    It tracks the number of clicks(such as location and device used), the geographic location of the clicks, and the devices used.
     This information can be crucial for businesses and marketers to optimize their strategies.It also generates QR codes for URLS.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-4">
    <AccordionTrigger>How is the privacy of users' data ensured?

</AccordionTrigger>
    <AccordionContent>
    The service ensures user privacy by anonymizing individual user data and only providing aggregated data for analytics. 
    Additionally, strict security measures are in place to protect user accounts and their data.    </AccordionContent>
  </AccordionItem>
</Accordion>
 </div>
    </div>
  )
}
export default LandingPage;