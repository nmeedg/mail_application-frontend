import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBell,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input, Avatar,Spinner } from "@material-tailwind/react";
import axios from "axios";
import Stomp from 'stompjs'
import SockJS from 'sockjs-client';

var stompClient=null
function Home() {
  let location = useLocation();
  let navigate = useNavigate();
  let [loading,setLoading]=useState(true)
  let [privateChats,setPrivateChats]=useState(new Map())
  let [userData,setuserData]=useState({
    "username":"",
    "password":"",
    "email":"",
    "telephone":null,
    "isConnected":false
  })
  let [publicChat,setPublicChat]=useState([])
  let server = "http://localhost:8080/users";
  let [id, setId] = useState(null);
  useEffect(() => {
    if (location.state) {
      setId(location.state.id);
      axios.get(server + "/one/" + location.state.id).then((res) => {
        console.log(res.data);
        setuserData(res.data)
        setLoading(false)
      });
    } else {
      navigate("/connexion");
      toast.error(
        "Veuillez d'abord vous connectez pour acceder a la page d'acceuil",
        {}
      );
    }
    registerUser()
  }, []);
  function registerUser() {
    let socket=SockJS("http://localhost:8080/ws")
    stompClient=Stomp.overWS(socket)
    stompClient.connect(()=>{},onConnected, onError)
  }


  /*
  function onError(err) {
    console.log(err)
  }
  function onConnected() {
    setuserData({...userData,"isConnected":true})
    stompClient.subscribe("/chatroomm/public",(payload)=>{
      let payloadData=JSON.parse(payload.body)
      switch (payloadData.status) {
        case "JOIN":
          break;
        case "MESSAGE":
          publicChat.push(payloadData)
          setPublicChat([...publicChat])
          break;
        default:
          break;
      }
    })
    
    stompClient.subscribe("/user/",userData.username,"/private")
  }

  function onPrivateMessageReceieved(payload) {
    let payloadData=JSON.parse(payload)
    if (privateChats.get(payloadData,sender)) {
      privateChats.set(payloadData,sender,[])
      setPrivateChats(new Map(privateChats))
    }
  }
*/

  return (
    <div>
        {loading ? <div className="flex items-center justify-center h-screen">
        <Spinner className="w-10 h-8" color="indigo"/> 
        </div>: <div>
      <div className="flex justify-between border-b-2 px-4">
        <div className=" w-[15%] border-r-2 text-indigo-700 font-extrabold flex items-center justify-center">
          <span>MaiLINFOTEL</span>
        </div>
        <div className="w-1/4 border-r-2 p-4">
          <div className="flex items-center justify-between space-x-4">
            <Input
              variant="outlined"
              label="Rechercher un message"
              className=" bg-indigo-100 bg-opacity-35"
              color="indigo"
              icon={<FontAwesomeIcon icon={faSearch} color="gray" />}
            />
            <div className=" py-2 px-3 bg-indigo-100 bg-opacity-35 rounded hover:cursor-pointer hover:scale-90 duration-150">
              <FontAwesomeIcon icon={faPenToSquare} color="gray" />
            </div>
          </div>
        </div>
        <div className="w-3/5 flex justify-start items-center">
          <div className=" mx-4 flex justify-center items-center space-x-2 w-fit hover:bg-gray-200 hover:rounded-md hover:shadow-inner hover:cursor-pointer p-2">
            <div className=" relative">
              <span className=" absolute z-50 text-white font-extrabold top-3 left-3">
                {userData.username.charAt(0).toUpperCase()+userData.username.charAt(1).toUpperCase()}
              </span>
              <Avatar size="md" className=" bg-indigo-500" />
            </div>
            <div>
              <h2 className="font-bold capitalize">{userData.username}</h2>
              <h3 className=" font-extralight text-gray-700 text-md">
                {userData.email}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b-1 text-md w-[15%]">
        <div className="border-r-2 border-b-2 m-3 rounded-md text-xs font-bold shadow-lg hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:scale-105 p-4 bg-gradient-to-l from-blue-800 to-indigo-700 text-white hover:cursor-pointer duration-200">
          <div className="flex justify-between items-center">
            <span>Nouveau message</span>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>
        <div className="border-r-2 mx-2 border-b-2 rounded-md text-xs font-bold shadow-inner hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:scale-105 p-4 bg-indigo-50 text-indigo-700 hover:cursor-pointer duration-200">
          <div className="flex justify-between items-center">
            <span> Boite de reception </span>
            <FontAwesomeIcon icon={faBell} />
          </div>
        </div>
        <div className="border-r-2 text-xs  border-b-2 p-4">
          envoyer un message
        </div>
        <div className="border-r-2 text-xs  border-b-2 p-4">brouillon</div>
        <div className="border-r-2 text-xs  border-b-2 p-4">
          messages important
        </div>
      </div>
    </div>}
    </div>
    
  );
}

export default Home;
