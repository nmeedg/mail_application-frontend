import { Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useState} from 'react';
import {
  faGithub,
  faGooglePlus,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'

function Signup() {
let [name,setName]=useState("")
let [email,setEmail]=useState("")
let [number,setNumber]=useState(null)
let [password,setPassword]=useState("")

function handleSubmit() {
  let temp={
    "username":name,
    "email":email,
    "telephone":number,
    "password":password
  }
}
  return (
<div className=" w-3/5 p-5 ">
          <h1 className="text-center text-2xl font-bold uppercase p-4">
            Creer un compte
          </h1>
          <p className="mx-auto text-center">En utilisant votre compte :</p>
          <div className="pb-4 pt-4 w-full flex justify-center space-x-6">
            <FontAwesomeIcon
              icon={faGithub}
              size="2xl"
              className=" text-indigo-700 hover:scale-110 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faGooglePlus}
              size="2xl"
              className=" text-indigo-700  hover:scale-110 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              className=" text-indigo-700  hover:scale-110 duration-200 hover:cursor-pointer"
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              size="2xl"
              className="rounded-full text-indigo-700  hover:scale-110 duration-200 hover:cursor-pointer"
            />
          </div>
          <p className="text-center pb-3">Ou</p>
          <form action="" className="flex flex-col space-y-5">
            <Input
              variant="outlined"
              color="indigo"
              type="name"
              label="Nom d'utilisateur"
              placeholder="ex: Edgard"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              icon={<FontAwesomeIcon icon={faUser} />}
            />
            <Input
              variant="outlined"
              color="indigo"
              type="email"
              label="Adresse email"
              value={email}
              placeholder="ex: ngoufackedgard1@gmail.com"
              onChange={(e)=>setEmail(e.target.value)}
              icon={<FontAwesomeIcon icon={faEnvelope} />}
            />
            <Input
              variant="outlined"
              color="indigo"
              type="number"
              value={number}
              label="Numero de telephone"
              placeholder="ex: (+237) 652 825 635"
              onChange={(e)=>setNumber(e.target.value)}
              icon={<FontAwesomeIcon icon={faPhone} />}
            />
            <Input
              variant="outlined"
              color="indigo"
              type="password"
              value={password}
              label="Mot de passe"
              onChange={(e)=>setPassword(e.target.value)}
              icon={<FontAwesomeIcon icon={faLock} />}
            />
            <Button color="indigo" className="w-1/2 text-center mx-auto mt-3" onClick={handleSubmit}>
              Nouveau compte
            </Button>
          </form>
        </div>
  )
}


export default Signup