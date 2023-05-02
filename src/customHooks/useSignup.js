import React from "react";
import { useState, useEffect } from "react";
import { SignupAuth } from "../store/SignupSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const success = useSelector((state) => state.SignupSlice.success);
  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);
  const signupUser = (e) => {
    e.preventDefault();
    dispatch(SignupAuth({ email, password }));
  };
  return { signupUser, email, setEmail, password, setPassword };
};
export default useSignup;
