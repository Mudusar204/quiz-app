import React, { useEffect } from "react";
import { useState } from "react";
import { loginAuth } from "../store/LoginSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSuccess } from "../store/LoginSlice";
const useLogin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const success = useSelector((state) => state.LoginSlice.success);
  useEffect(() => {
    if (success) {
      navigate("/");
      dispatch(setSuccess(false));
    }
  }, [success]);
  const userLogin = (e) => {
    e.preventDefault();
    dispatch(loginAuth({ email, password }));

    console.log("functionfjkdsjfldskfl");
  };
  return { userLogin, email, setEmail, password, setPassword };
};

export default useLogin;
