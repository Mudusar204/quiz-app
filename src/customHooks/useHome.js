import React, { useState, useEffect } from "react";
import { setlimitations, getQuestions } from "../store/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { toast } from "react-toastify";
const useHome = () => {
  const status = useSelector((Store) => Store.HomeSlice.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin, setSignin] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setId(user.uid);
        setSignin(true);
        const parts = user.email.split("@");
        setName(parts[0]);
      } else {
      }
    });
  }, []);
  const setLimits = (limit, catagory) => {
    if (signin) {
      dispatch(setlimitations({ catagory, signin, name, id }));
      navigate("/quiz");
    } else {
      navigate("/login");
    }
  };
  const checkResult = () => {
    if (signin) {
      navigate("/result");
    } else {
      navigate("/login");
    }
  };
  const signOutUser = async () => {
    try {
      await signOut(auth);
      toast.success("Log out Successfully");
    } catch (error) {
      console.log(error);
      toast.error("error");
    }
  };
  return {
    setLimits,
    checkResult,
    useEffect,
    signOutUser,
    signin,
  };
};
export default useHome;
