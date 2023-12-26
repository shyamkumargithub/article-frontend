import React, { useContext } from "react";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { storeSession } from "../common/session";
import { APIBASE_URL } from '../constants/apiUrl';
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { authWithGoogle } from '../common/firebase';

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password





const UserAuthForm = ({ type }) => {
  let {
    userAuth: { access_token },
    setUserAuth,
  } = useContext(UserContext);

 

  const userAuthThroughServer = (serverRoute, formData) => {
   console.log("-------url ", APIBASE_URL + serverRoute,'-----form data',formData);
    axios
      .post(APIBASE_URL+ serverRoute, formData)
      .then(({ data }) => {
        console.log('-----user response ',data)
        storeSession("user", JSON.stringify(data));
        setUserAuth(data)
      })
      .catch(({ response }) => {
        console.log('-------error response  server auth',response)
        toast.error(response.data.error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let serverRoute = type == "sign-in" ? "/signin" : "/signup";
    let form = new FormData(formElement);
    let formData = {};
    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }
    console.log("--- form data", FormData);
    let { fullname, email, password } = formData;

    if (fullname) {
      if (fullname.length < 3) {
        return toast.test("Fullname must be at least 3 letters long");
      }
    }

    if (!email.length) {
      return toast.error("Enter email");
    }
    if (!emailRegex.test(email)) {
      return toast.error("Email is invalid");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password is invalid");
    }

    userAuthThroughServer(serverRoute, formData);
  };

  const handleGoogleAuth=(e)=>{
    e.preventDefault();
    authWithGoogle().then(user=>{
      console.log('------google signin response ',user)
      let serverRoute="/google-auth"
      let formData = {
        access_token: user.accessToken,
      };
      userAuthThroughServer(serverRoute,formData)
    })
    .catch(err=>{
      toast.error('Trouble login through google')
       console.log('--- error when google signin',err)
    })
  }

  return access_token ? (
    <Navigate to="/" />
  ) : (
    <AnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form id="formElement" className="w-[80%] max-w-[400px]">
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type == "sign-in" ? "Welcome back" : "Join us today"}
          </h1>
          {type != "sign-in" ? (
            <InputBox
              name="fullName"
              icon="fi-rr-user"
              type="text"
              placeholder={"full name"}
            />
          ) : (
            ""
          )}
          <InputBox
            name="email"
            icon="fi-rr-envelope"
            type="email"
            value={"shyamlaishram79@yahoo.com"}
            placeholder={"abc@xyz.com"}
          />
          <InputBox
            name="password"
            icon="fi-rr-key "
            value={"Kunaal12Qasdadasd"}
            type="password"
            placeholder={"password"}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-dark center mt-14"
          >
            {type == "sign-in" ? "Sign In" : "Sign Up"}
          </button>
          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>
          <button
           onClick={handleGoogleAuth}
           className="btn-dark flex items-center justify-center gap-4 w-[90%] center">
            <img src={googleIcon} className="w-5" />
            continue with google
          </button>
          {type == "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an account ?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member ?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnimationWrapper>
  );
};

export default UserAuthForm;
