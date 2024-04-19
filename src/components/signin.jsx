import { Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react';
import {
  faGithub,
  faGooglePlus,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast,ToastContainer} from 'react-toastify'

function Signin() {
    let [email,setEmail]=useState("")
    let [password,setPassword]=useState("")

    let navigate=useNavigate()

    function hanleSubmit() {
      if (email == "") {
        toast.error("Veuillez renseigner l'adresse email")
      } else {
        
      }
        let temp={
            "email":email,
            "password":password
        }
        axios.post("http://localhost:8080/users/login",temp).then((res)=>{
            console.log(res)
            navigate("/",{
              state:{
                "id":res.data
              }
            })
            toast.success("Bienvenue, vous etes connecté",{
              position:"top-center"
            })
        },(err)=>{
            console.log(res)
        })
        setEmail("")
    }


  return (
<div className=" w-3/5 p-5 ">
          <h1 className="text-center text-2xl font-bold uppercase p-6">
            Se connecter
          </h1>
          <p className=" text-center py-5">Entrer les memes informations que lors de la creation de votre compte</p>
          <form action="" className="flex flex-col space-y-6 mt-3 mb-5">

            <Input
              variant="outlined"
              color="indigo"
              type="email"
              label="Adresse email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="ex: ngoufackedgard1@gmail.com"
              icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <Input
              variant="outlined"
              color="indigo"
              type="password"
              label="Mot de passe"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              icon={<FontAwesomeIcon icon={faLock} />}
            />
            <Button color="indigo" className="w-1/2 text-center mx-auto mt-3" onClick={hanleSubmit}>
              Se connecter
            </Button>
          </form>
          <p className="mx-auto text-center">Ou en utilisant votre compte :</p>
          <div className="pt-8 w-full flex justify-center space-x-8">
            <FontAwesomeIcon
              icon={faGithub}
              size="2x"
              className=" text-indigo-700 hover:scale-125 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faGooglePlus}
              size="2x"
              className=" text-indigo-700  hover:scale-125 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              className=" text-indigo-700  hover:scale-125 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2x"
              className="rounded-full text-indigo-700  hover:scale-125 duration-200 hover:cursor-pointer"
            />
          </div>
        </div>
  )
}


export default Signin