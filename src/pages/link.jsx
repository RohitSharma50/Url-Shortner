import {useNavigate, useParams} from "react-router-dom";
import {BarLoader, BeatLoader} from "react-spinners";
import {Button} from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import {useEffect, useMemo} from "react";
import {deleteUrl, getUrl} from "@/db/apiUrls";
import {UrlState} from "@/context";
import  { getClicksForUrl}  from "@/db/apiClicks";
import {Copy, Download, LinkIcon, Trash} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DeviceStats from "../components/ui/device-stats";

 import Location from "../components/ui/location-stats"; 




 const Link = () => {

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
function replaceDashboardWithID(id, short_url) {
  // Get the current URL
  const currentUrl = window.location.href;
  
  // Remove '/link/id' and append the ID
  const newUrl = currentUrl.replace('/link/'+ id, '/'+short_url);
  
  return newUrl;
} 
  const {id} =useParams();
  const {user} = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data:url,
    fn,
    error,
  } = useFetch(getUrl, {id, user_id: user?.id});

  const {
    loading:loadingStats,
    data:stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const {loading: loadingDelete, fn:fnDelete} = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    
  }, []);

  useEffect(() => {
    if(!error && loading === false) fnStats();
  }, [loading,error]);


  if(error){
    navigate("/dashboard");
  }

  let link= "";
  if(url){
    link = url?.custom_url ? url?.custom_url : url.short_url;
  } 
  const newLink = useMemo(() => (url ? replaceDashboardWithID(url.id, url?.short_url) : ""), [url]);
 

  return (  
    <>    
         {(loading || loadingStats) && (<BarLoader width={"100%"} color="#36d7b7" />)}
       <div className="flex flex-row gap-8 max-xl:flex-col justify-between">
       <div className="flex flex-col items-start gap-8 rounded-lg sm:w-2/5">
             <span className="text-4xl font-extrabold  cursor-pointer">{url?.title}</span> 
        <a 
              href={newLink} 
              target="_blank"
              className="text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer"
            >{newLink}
             </a> <br/>
            
             <a href={url?.original_url} 
             target="_blank"
             className="flex item-center gap-1 hover:underline cursor-pointer"
             >
             <LinkIcon className="p-1" /> 
             {url?.original_url}
              </a>
               <span className="flex item-end font-extralight text-sm">
                 {new Date(url?.created_at).toLocaleString()}
               </span>
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
              onClick={() =>
                fnDelete().then(() => {
                  navigate("/dashboard");
                })
              }
              disable={loadingDelete}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash />
              )}
            </Button>
             </div>
             <img 
        src={url?.qr} 
        alt="Qr code"
        className="w-11/12 self-centersm:self-start ring-blue-500 p-1 "
        />
        </div>
        <Card className="sm:w-3/5">
  <CardHeader>
    <CardTitle className="text-4xl font-extrabold">Stats</CardTitle>
  </CardHeader>
{ stats && stats?.length ?(
  <CardContent className="flex flex-col gap-6">
   <Card>
  <CardHeader>
    <CardTitle>Total Clicks</CardTitle>
  </CardHeader>
  <CardContent>
    <p>{stats?.length}</p>
  </CardContent>
  
</Card>
   <CardTitle>
  <Location stats={stats} />
   </CardTitle>
<CardTitle>
 <DeviceStats stats={stats}/>
</CardTitle>

</CardContent>
):(
<CardContent>
  { loadingStats == false
  ? "no Statistics yet"
: "Loading Statistics"}
</CardContent>)
  }
  
</Card>

       </div>
       
    
    
    </>
  )
}
export default Link;