import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {Button} from "@/components/ui/button";
  import {Input} from "@/components/ui/input";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {UrlState} from "@/context";
import {Card} from "@/components/ui/card";
import Error from "../error";
import * as yup from "yup"
import useFetch from "@/hooks/use-fetch";
import {createUrl} from "@/db/apiUrls";
import {BeatLoader} from "react-spinners";

import {QRCode} from "react-qrcode-logo";

export function CreateLink() {
    const {user}= UrlState();

    const navigate= useNavigate();
    const ref = useRef();

    let [searchParams, setSearchParams]= useSearchParams();
    const longLink= searchParams.get("createNew");
      
    const[errors, setErrors]= useState({});
    const [formValues, setFormValues]= useState({
        title:"",
        longUrl: longLink ? longLink: "",
        customUrl: "",
    })
    function removeDashboard() {
      // Get the current URL
      const currentUrl = window.location.href;
      
      // Remove '/dashboard' and append the short_url/ custom_url
      const newUrl = currentUrl.replace('/dashboard', '');
      
      return newUrl;
    } 
    const schema =yup.object().shape({
        title: yup.string().required("title is required"),
        longUrl: yup
        .string()
        .url("must be avalid URL")
        .required("Long URL is required"),
        customUrl: yup.string(),
    });

    const handleChange=(e)=>{
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value,
        });
    };

    const{
        loading,
        error,
        data,
        fn:fnCreateUrl,
     }= useFetch(createUrl,{ ...formValues, user_id: user.id})
    

    useEffect(()=>{
       if(error === null && data){
        navigate(`/link/${data[0].id}`);
       }
    }, [error, data]);






    
const createNewLink = async () => {
     setErrors([])
        try{
            await schema.validate(formValues, {abortEarly:false});
             const canvas= ref.current.canvasRef.current;
             const blob = await new Promise((resolve) => canvas.toBlob(resolve));

             await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };


    return (
        <Dialog 
        defaultOpen={longLink}
        onOpenChange={(res)=>{
            if(!res) setSearchParams({})
        }}>
  <DialogTrigger>
    <Button  variant="destructive" >Create New Link </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      {/* // title of creating new link card  */}
      <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>  
    </DialogHeader>
     
    



    {formValues?.longUrl && (
        <QRCode  ref={ref} value={formValues?.longUrl} size={250} />
    )}



    <Input 
    id="title" 
    placeholder="Short Link's title"
    value={formValues.title}
    onChange={handleChange} 
    />
        {errors.title && <Error message={errors.title} />}

    <Input 
    id="longUrl" 
    placeholder="Enter your Loooong URL"
    value={formValues.longUrl}
    onChange={handleChange} 
    />
        {errors.longUrl && <Error message={errors.longUrl} />}

    <div className="flex items-center gap-2">
        <Card className="p-2">{removeDashboard()}</Card>/
    <Input 
    id="customUrl" 
    placeholder="Custom Link (optional)"
    value={formValues.customUrl}
    onChange={handleChange} />
    </div>
    {error && <Error message={errors.message} />}
    <DialogFooter className="sm: justify-start">
      <Button 
       type="button"
       variant="destructive" 
      onClick={createNewLink}
      disabled={loading}

       >
        {loading? <BeatLoader size={10} color="white" />: "create"}
       </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

    )  
}  

