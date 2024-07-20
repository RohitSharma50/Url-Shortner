import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {Input} from "./ui/input";
  import {Button} from "./ui/button";
  import {BeatLoader} from "react-spinners";
  import Error from "./error";
  import {useState, useEffect} from "react";
  import * as Yup from  'yup';
  import useFetch from "@/hooks/use-fetch";
  import {signup} from "@/db/apiAuth"
import {useNavigate, useSearchParams} from "react-router-dom";
import {UrlState} from "@/context"

 const Signup = () => {
 const [errors, setErrors]= useState([]);
 const [formData, setFormData]= useState({
    name: "",
    email: "",  
    password: "",
    profile_pic: null,
});


const navigate = useNavigate();
let [searchParams]= useSearchParams(); 
const longLink = searchParams.get("createNew");


 const handleInputChange =(e) =>{
    const{name, value, files}= e.target;
    setFormData((prevState) =>({
        ...prevState,
        [name]: files? files[0] : value,
    }));
 }
 
    const {data, error, loading, fn: fnSignup}= useFetch(signup, formData);
 const {fetchUser} = UrlState();
useEffect(() =>{
   if(error === null && data){ 
    navigate(`/dashboard?${longLink ?  `createNew =${longLink}`: ""}`);
  
  fetchUser();
  }
},[error, loading]);



 const handleSignup = async () =>{
 setErrors([]);
 try{
        const schema=Yup.object().shape({
        name: Yup.string()
        .required("name is Required"),
        email: Yup.string()
        .email("Invalid Email")
        .required("Email is Required"),
        password: Yup.string()
        .min (6, "Password must be atleast 6 characters")
        .required("Password is Required"),
        profile_pic: Yup.mixed()
        .required("profile picture is required"),
    } );
    await schema.validate(formData, {abortEarly: false})

    await fnSignup()
    // api call
}
catch(e) {
     const newErrors={};
     
     e?.inner?.forEach((err)=>{
        newErrors[err.path]= err.message;
     });
     setErrors(newErrors);
}}


  return (
        <Card>
  <CardHeader>
     <CardTitle>Signup</CardTitle>
    <CardDescription>Create a new account if you haven&rsquo;t already </CardDescription>
   { error && <Error message={error.message} />}
  </CardHeader>
  <CardContent className="space-y-2">
    <div className="space-y-1">
<Input 
name="name"
 type="text" 
placeholder="Enter Name"
onChange={handleInputChange}
/>
    </div>
    { errors.name && <Error message={errors.name}/> } 
    <div className="space-y-1">
<Input 
name="email"
 type="email" 
placeholder="Enter Email"
onChange={handleInputChange}
/>
    </div>
    { errors.email && <Error message={errors.email}/> } 


    <div className="space-y-1">
<Input 
       name='password' 
       type="password" 
       placeholder="Enter Password"
      onChange={handleInputChange}
/>
    
    {errors.password && <Error message={errors.password} />} 
    </div>

    
    <div className="space-y-1">
<Input 
       name='profile_pic' 
       type="file" 
       placeholder="image/*"
      onChange={handleInputChange}
/>
    
    {errors.profile_pic && <Error message={errors.profile_pic} />} 
    </div>

  </CardContent>
  <CardFooter>
  <Button onClick={handleSignup}>
{loading?(<BeatLoader size={10} color="#36d7b7" />):("Create Account" )}
   </Button>
  </CardFooter>
</Card>

  )
}
 export default Signup;  







