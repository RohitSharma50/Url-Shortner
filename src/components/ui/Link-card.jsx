import {Link} from "react-router-dom";
import {Button} from "./button";
import {Copy, Download, LinkIcon, Trash} from "lucide-react";
import {deleteUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";
import useFetch from "@/hooks/use-fetch";
import {useMemo} from "react";

const LinkCard =({url, fetchUrls})=>{


  function replaceDashboardWithID(short_url) {
    // Get the current URL
    const currentUrl = window.location.href;
    
    // Remove '/dashboard' and append the short_url/ custom_url
    const newUrl = currentUrl.replace('/dashboard','/'+ short_url);
    
    return newUrl;
  } 
  
const downloadImage=()=>{
    const imageUrl=url?.qr;
    const fileName=url?.title;

    const anchor =document.createElement("a");
    anchor.href=imageUrl;
    anchor.download=fileName;

    document.body.appendChild(anchor);

    anchor.click(); 
    document.body.removeChild(anchor);
}

     const {loading: loadingDelete, fn: fnDelete}=useFetch(deleteUrl, url?.id);

     const newLink = useMemo(() => (url ? replaceDashboardWithID(url?.custom_url ? url?.custom_url : url.short_url) : ""), [url]);


    return ( 
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg ">
        <img 
        src={url?.qr} 
        alt="Qr code"
        className="md:h-48 lg:h-60 object-contain ring ring-blue-500 self-start "
        /> 
        <div className="flex flex-col flex-1">
        <a href={`/link/${url?.id}`}  >
          <span className="text-3xl font-extrabold hover:underline cursor-pointer">
            {url?.title}
          </span></a>
        <a href={newLink} >
          <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">{newLink }
            </span>
       </a>
          <span className="flex items-center gap-1 hover:underline cursor-pointer"> {url?.original_url}</span>
          <span className="flex font-extralight text-sm flex-1"> 
            {new Date(url?.created_at).toLocaleString()}</span>
          </div>
             <div className="flex gap-2">
             <Button 
             variant="ghost" 
             onClick={()=> 
                navigator.clipboard.writeText(newLink) }>
                <Copy />
             </Button >
             
             <Button 
             variant="ghost"
              onClick={downloadImage} 
               >
                <Download />
             </Button>

             <Button 
             variant="ghost"
              onClick={()=>fnDelete().then(()=>fetchUrls())} 
              >
               {loadingDelete? <BeatLoader size={5} color="white"/> : <Trash />} 
               
             </Button>
             </div>



          
    </div>
    )
}
export default LinkCard;