import React, { useState } from "react";
import {Textarea,Input} from '@material-tailwind/react'
function NewMessage() {
  let [email, setEmail] = useState("");
  let [title, setTitle] = useState("");
  let [message, setMessage] = useState("");

  return (
    <div>
      <h1 className=" font-bold text-xl text-center py-3">Nouveau message</h1>
      <div className="px-2">
        <div className=" border-b-2 pb-2 mb-5 text-gray-700">De : <span>Vous</span></div>
        <div className="border-b-2 mb-5 pb-2">
            <span className="text-gray-700">Adresse email du destinataire :  </span>
        </div>
        <div className="border-b-2 mb-5 pb-2">
            <span className="text-gray-700">Objet : <Input variant="static" className=""></Input>  </span>
        </div>
        <div>
            <span className="text-gray-700 mb-5 ">Message : </span>
            <Textarea color="indigo" value={message} onChange={(e)=>setMessage(e.target.value)} className=""></Textarea>
        </div>
      </div>
    </div>
  );
}

export default NewMessage;
