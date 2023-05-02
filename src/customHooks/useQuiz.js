import React from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { setCount, getQuestions, checkMarks } from "../store/HomeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, addDoc, getDocs } from "firebase/firestore";

const useQuiz = () => {
  const { catagory, name } = useSelector((Store) => Store.HomeSlice);
  const dispatch = useDispatch();
  const startQuiz = () => {
    dispatch(getQuestions());
  };
  const makeResult = (marks) => {
    dispatch(checkMarks(marks));
  };
  const addResult = async (marks, questions, catagory) => {
    try {
      const date = new Date();
      if ((marks / questions.length) * 100 > 33) {
        const docRef = await addDoc(collection(db, `${name}`), {
          totalMarks: questions.length,
          obtainedMarks: marks,
          createdAt: date.toLocaleDateString(),
          status: "pass",
          catagory: catagory,
        });
      } else {
        const date = new Date();
        console.log(date.toLocaleDateString(), "date from result");
        const docRef = await addDoc(collection(db, `${name}`), {
          totalMarks: questions.length,
          obtainedMarks: marks,
          createdAt: date.toLocaleDateString(),
          status: "fail",
          catagory: catagory,
        });
      }
    } catch (e) {}
  };
  return {
    startQuiz,
    addResult,
    makeResult,
  };
};

export default useQuiz;
