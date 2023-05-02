import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";
const Result = () => {
  const { questions, status, marks, name } = useSelector(
    (Store) => Store.HomeSlice
  );
  const navigate = useNavigate();
  const [result, setResult] = useState("fail");
  const [stateData, setStateData] = useState([]);
  const getResult = () => {
    const usersRef = collection(db, `${name}`);
    const data = getDocs(usersRef)
      .then((querySnapshot) => {
        const newArray=[]
        // console.log(data,'datat from firebase')
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          newArray.push(userData);
        });
        setStateData(newArray)
      })
      .catch((error) => {
      });
    };
  useEffect(() => {
    if (questions.length !== 0) {
      if ((marks / questions.length) * 100 > 33) {
        setResult("pass");
      } else {
        setResult("fail");
      }
    }
  }, []);
  let bgColor = result === "fail" ? "bg-red-100" : "bg-green-100";
  let borderColor = result === "fail" ? "border-red-400" : "border-green-400";
  let textColor = result === "fail" ? "text-red-700" : "text-green-700";
  let message =
    result === "fail"
      ? `Sorry, Fail! ${marks} Marks out of ${questions.length}`
      : `Congratulations, you passed! With ${marks} Marks out of ${questions.length}`;
  return (
    <>
      <div
        className={`border ${borderColor} ${bgColor} text-center px-4 py-9  rounded relative`}
        role="alert"
      >
        {questions.length === 0 ? (
            <div>


          <h1 className="text-xl font-semibold">Plz Submit a Test!</h1>
            </div>

        ) : (
          <div>
            <strong className={`font-bold text-xl ${textColor}`}>
              {message}
            </strong>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
            <div className="flex justify-center gap-10 mt-6">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500"
              >
                Restart
              </button>
              <button
                onClick={getResult}
                className="bg-green-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500"
              >
                Previous Test
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {stateData.map((item, index) => {
            return (
            <div className="bg-white rounded-lg shadow-md p-8 w-[500px] mx-auto mt-16">
               <h2 className="text-2xl font-bold mb-4">{`Test ${index+1} Result`}</h2>
              <div className="mb-4 flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="testName"
                >
                  Test Name
                </label>
                <p className="text-gray-700 text-base">{item.catagory}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="date"
                >
                  Date
                </label>
                <p className="text-gray-700 text-base">{item.catagory}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="totalMarks"
                >
                  Total Marks
                </label>
                <p className="text-gray-700 text-base">{item.totalMarks}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="obtainedMarks"
                >
                  Obtained Marks
                </label>
                <p className="text-gray-700 text-base">{item.obtainedMarks}</p>
              </div>
              <div className="mb-4 flex justify-between">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <p
                  className={`text-${
                    item.status === "pass" ? "green" : "red"
                  }-700 text-base`}
                >
               
                  {item.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Result;
