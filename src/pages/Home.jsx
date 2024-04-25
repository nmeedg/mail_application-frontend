import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faBell,
  faSearch,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import MessageBody from '../components/MessageBody'

import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Input, Avatar, Spinner } from "@material-tailwind/react";
import axios from "axios";
import NewMessage from '../components/NewMessage'

function Home() {
  let location = useLocation();
  let options = [
    { title: "Boite de reception", icon: faBell, "page":NewMessage },
    { title: "Messages envoyés", icon: faTelegram, "page":NewMessage },
    { title: "Important", icon: faStar, "page":NewMessage },
    { title: "Brouillon", icon: faPenToSquare, "page":NewMessage },
  ];
  let navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [messages, setMessages] = useState(null);
  let [currentIndex, setcurrentIndex] = useState(null);
  //let [privateChats, setPrivateChats] = useState(new Map());
  let [userData, setuserData] = useState({
    username: "",
    password: "",
    email: "",
    telephone: null,
    isConnected: false,
  });
  let [publicChat, setPublicChat] = useState([]);
  let server = "http://localhost:8080";
  let [id, setId] = useState(null);

  useEffect(() => {
    const interval=setInterval(()=>{
      if (location.state.id) {
        getMessages(location.state.id)
      }
      
    },1000)
    if (location.state) {
      setId(location.state.id);
      axios.get(server + "/users/one/" + location.state.id).then((res) => {
        setuserData(res.data);
        setLoading(false);
        getMessages(location.state.id);
      });
      // getMessages(location.state.id)
    } else {
      navigate("/connexion");
      toast.error(
        "Veuillez d'abord vous connectez pour acceder a la page d'acceuil",
        {}
      );
    }
    return ()=>clearInterval(interval);
  }, []);

  let previousSize=0;
  let [symbols,setSymbols]=useState([])
  function getMessages(tempID) {
    if (messages) {
      previousSize=messages.length
    }
    axios.get(server + "/messages/receive/" + tempID).then(
      (res) => {
        let temp4=res.data
        temp4.reverse()
        let newSize=temp4.length;
        if (newSize > previousSize) {
          if (previousSize !== 0) {
            toast.success("nouveau message !")
          }
        }
        previousSize = newSize;
        setMessages(temp4);
        for (let index = 0; index < res.data.length; index++) {
          const mes = res.data[index];
          axios.get(server + "/users/one/" + mes.expediteurId).then((res2)=>{
            let test=res2.data.username.charAt(0).toUpperCase()+res2.data.username.charAt(1).toUpperCase();
            symbols.push(test)
            setSymbols(symbols)
          })
        }
        
        
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function handleClick(ind) {
    setcurrentIndex(ind)
  }
  function changePage() {
    setcurrentIndex(10.01)
  }


  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="w-10 h-8" color="indigo" />
        </div>
      ) : (
        <div>
          <div className="flex z-40 justify-between border-b-2 px-4 sticky top-0 bg-white bg-opacity-20 backdrop-blur-lg">
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
            <div className="w-3/5 flex justify-end items-center">
              <div className=" mx-4 flex justify-center items-center space-x-2 w-fit hover:bg-gray-200 hover:rounded-md hover:shadow-inner hover:cursor-pointer p-2">
                <div className=" relative">
                  <span className=" absolute z-50 text-white font-extrabold top-3 left-3">
                    {userData.username.charAt(0).toUpperCase() +
                      userData.username.charAt(1).toUpperCase()}
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
          <div className="relative">
          <div className="flex px-4">
            <div className="border-b-1 text-md w-[15%] z-10 sticky left-0 bottom-0">
              <button onClick={changePage}>
              <div className="border-r-2 border-b-2 m-3 rounded-md text-xs font-bold shadow-lg hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:scale-105 p-4 bg-gradient-to-l from-blue-800 to-indigo-700 text-white hover:cursor-pointer duration-200">
                <div className="flex justify-between items-center">
                  <span>Nouveau message</span>
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>
              </button>
              {options.map((item, index) => (
                <button key={index}>
                  <div
                  className="border-r-2 my-2 mx-2 border-b-2 rounded-md text-xs font-bold shadow-inner hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:scale-105 p-4 bg-indigo-50 text-indigo-700 hover:cursor-pointer duration-200"
                >
                  <div className="flex justify-between items-center">
                    <span> {item.title} </span>
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                </div>
                </button>

              ))}
            </div>
            <div className="w-[25%] border-r-2 border-l-2">
              {!messages ? (
                <div className="flex items-center justify-center w-full h-screen">
                  <Spinner className="w-8 h-7" color="indigo" />
                </div>
              ) : (
                messages.map((message, index) => (
                  <button onClick={()=>handleClick(index)} key={index} className="flex space-x-2 items-center p-2 w-[97%] text-start mx-1 shadow-md bg-indigo-50 rounded-xl my-2 hover:bg-gradient-to-r hover:from-white hover:to-white hover:text-indigo-700 hover:border hover:border-indigo-700 hover:scale-105 text-indigo-700 hover:cursor-pointer duration-200">
                    <div className="w-[40px] h-[40px] my-2 p-2 bg-gradient-to-l from-blue-800 to-indigo-700 rounded-full flex items-center justify-center">
                      <div className=" font-semibold text-center text-white">
                        <div>
                          <span>{symbols[index]}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className=" text-sm font-bold">{message.title}</h5>
                      <h6 className="text-xs font-medium text-gray-500">
                        {message.contenu + "..."}
                      </h6>
                    </div>
                  </button>
                ))
              )}
            </div>
            <div className="min-h-[85vh] w-[60%]">
              {currentIndex == null ? <div className=" flex justify-center items-center h-full"><h2 className="text-indigo-800 italic "> selectonnez le message a afficher </h2></div>: currentIndex == 10.01 ? <div><NewMessage></NewMessage></div> : <MessageBody id={id} currentIndex={currentIndex} messages={messages} />}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
