import { Button, Textarea } from "@material-tailwind/react";
import { faForward, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {toast} from 'react-toastify';
import axios from "axios";

function MessageBody({ currentIndex, messages,id }) {
  useEffect(() => {
    idToUser(messages[currentIndex].expediteurId);
  }, []);
  let server = "http://localhost:8080";
  function idToUser(id) {
    axios.get(server + "/users/one/" + id).then((res) => {
      setUser(res.data);
    });
  }
  let [user, setUser] = useState(null);
  let [newMessage,setNewMessage]=useState("");
  let [active, setActive] = useState(false);
  let currentMessage = messages[currentIndex];
  function handleClick() {
    if (newMessage == "") {
        toast.info("impossible d'envoyer un message vide",{
            position:"top-right",
            delay:0.5
        })
    } else {
        axios.post(server+"/messages/new",{
            "contenu":newMessage,
            "title":currentMessage.title,
            "recepteurId":user.userId,
            "expediteurId":id
        }).then((res)=>{
            console.log(res.data);
            setNewMessage("")
            toast.success("Message envoyé avec sucess")
        },(err)=>{
            console.log(err)
        })
        
    }
    
  }
  return (
    <div className="p-5 h-full relative">
      <div className="flex justify-between mx-2">
        <div className="flex items-center space-x-2">
          <div className="flex w-[40px] h-[40px] bg-gradient-to-r from-blue-800 to-indigo-700  rounded-full items-center justify-center">
          <span className="font-semibold text-white">
              {user && user.username.charAt(0).toUpperCase() + user.username.charAt(1).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-md font-bold">{user && user.username}</div>
            <span className="text-sm text-indigo-600">
              {user && user.email + ", "}
            </span>{" "}
            <span className="text-sm font-bold text-indigo-800">
              {user && user.telephone}
            </span>
          </div>
        </div>
        <div>
          <Button
            color="indigo"
            variant="outlined"
            onClick={() => setActive(!active)}
          >
            <span className="mr-1">Repondre</span>{" "}
            <FontAwesomeIcon icon={faEdit} />{" "}
          </Button>
        </div>
      </div>
      <h1 className="my-6 font-bold text-xl"> <span className=" underline ">Objet </span>: <span className="bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">{currentMessage.title}</span></h1>
      <p>{"" + currentMessage.contenu + "."}</p>
      <div className=" absolute bottom-0 right-0 left-0">
        <div className={active ? "block" : " hidden"}>
          <div className="flex flex-col items-end ml-2">
            <Textarea color="indigo" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} className="" label="Message"></Textarea>
            <Button size="sm" className="text-white bg-indigo-900 text-xs " onClick={handleClick}>
              {" "}
              <span className="mr-2">Envoyer</span>{" "}
              <FontAwesomeIcon size="xl" icon={faTelegramPlane} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBody;