import React, { useState } from 'react'
import baseURL from '../config/axios-config'
import useHome from '../customHooks/useHome'
import { useSelector } from 'react-redux'
import Store from '../store/Store'
import img from '../assets/imgs/img1.jpg'
import { db } from '../config/firebase-config'
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Link } from 'react-router-dom'

const Home = () => {

    const { setLimits, checkResult, useEffect,signin,signOutUser } = useHome()
    const [data, setData] = useState([{ catagory: 'JavaScript' }, { catagory: 'MySQL' }
        , { catagory: 'DevOps' }, { catagory: 'Docker' }, { catagory: 'Kubernetes' }
        , { catagory: 'Linux' }])
    return (
        <>
            <nav className="bg-gray-800 py-4">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex justify-between items-center">
                        <a href="/" className="text-xl text-white font-bold">Quiz App</a>
                        <div>
                            <button className="text-white hover:bg-gray-700 rounded-lg py-2 px-4"><Link to={'/login'}>Login</Link></button>
                            {signin?
                            <button onClick={signOutUser} className="text-white hover:bg-gray-700 rounded-lg py-2 px-4 ml-4">Sign Out </button>:
                            <button className="text-white hover:bg-gray-700 rounded-lg py-2 px-4 ml-4"><Link to={'/signup'}>Sign up</Link> </button>}
                        </div>
                    </div>
                </div>
            </nav>
            <div className="container mx-auto mt-8 px-4 md:px-8">
                <div className='flex justify-between items-center mb-6' >

                    <h2 className="text-4xl font-bold mb-10 my-10">Select a category to begin:</h2>
                    <button onClick={checkResult} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500">Check Result</button>
                </div>

                <div className="flex flex-wrap -mx-4">
                    {data.map((item, index) => {
                        return (<div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">

                                <img src={require(`../assets/imgs/img${index}.jpg`)} alt="" className="w-[100%] h-64 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">{item.catagory}</h3>
                                    <p className="text-gray-700 leading-relaxed mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla tristique ligula, eu hendrerit velit bibendum eu.</p>
                                    <button onClick={() => setLimits(null, item.catagory)} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500">Start Quiz</button>
                                </div>
                            </div>
                        </div>)
                    })
                    }
                </div>
                <div className='flex justify-between items-center mb-6' >

                    <h2 className="text-4xl font-bold mb-10 my-10">Start Test Without Catagory:</h2>
                    <button onClick={() => setLimits()} className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500">Start Quiz</button>
                </div>
            </div>
        </>
    );
}




export default Home