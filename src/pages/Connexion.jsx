import { Input, Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {
  faGithub,
  faGooglePlus,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"; 
import { faUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone, faLock, faL } from "@fortawesome/free-solid-svg-icons";
import Signup from "../components/signup";
import Signin from "../components/signin";

function Connexion() {
  let [active, setActive] = useState(false);

  let handleChange=()=>setActive(!active)
  return (
    <div className=" h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-gray-100 to-blue-200">
      <section className=" w-2/3 min-h-[550px] bg-white rounded-xl shadow-xl overflow-hidden flex">
        {!active ? <Signup handleParent={setActive}></Signup> : <Signin />}
        <div className="bg-gradient-to-br p-5 from-blue-700 to-indigo-900 w-2/5 rounded-tl-[120px] rounded-bl-[120px] flex items-center justify-center">
          {!active ? <div className="text-white flex flex-col">
            <h2 className="text-2xl font-bold text-center py-4">
              Bienvenue sur MaiLINFOTEL !
            </h2>
            <p className="text-center">
              Entrer vos informations pour pouvoir profiter de toutes les
              fonctionnalités
            </p>
            <Button
              variant="outlined"
              color="white"
              className="font-bold mt-5 mx-auto"
              onClick={handleChange}
            >
              Se connecter
            </Button>
          </div> : <div className="text-white flex flex-col">
            <h2 className="text-2xl font-bold text-center py-4">
              Ravi de vous revoir sur MaiLINFOTEL !
            </h2>
            <p className="text-center">
              Entrer vos informations pour pouvoir vous connectez ou :
            </p>
            <Button
              variant="outlined"
              color="white"
              className="font-bold mt-5 mx-auto"
              onClick={handleChange}
            >
              Creer un compte
            </Button>
          </div>}
        </div>
      </section>
    </div>
  );
}

export default Connexion;
