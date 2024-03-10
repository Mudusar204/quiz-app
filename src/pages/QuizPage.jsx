import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { STATUS } from '../store/HomeSlice';
import useQuiz from '../customHooks/useQuiz'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
const QuizPage = () => {
    const navigate = useNavigate()
    const { startQuiz, makeResult, addResult } = useQuiz()
    const questions = useSelector((Store) => Store.HomeSlice.questions)
    const catagory = useSelector((Store) => Store.HomeSlice.catagory)
    const status = useSelector((state) => state.HomeSlice.status)
    const signed = useSelector((Store) => Store.HomeSlice.signin)
    const [count, setCount] = useState(0)
    const [marks, setMarks] = useState(0)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [statuss, setStatuss] = useState()
    const [result, setResult] = useState('any')
    // useEffect(() => {
    //     console.log('useEffect chla')
    //     if (marks / questions.length * 100 > 33) {
    //         setStatuss('pass')
    //     } else {
    //         setStatuss('fail')
    //     }
    // }, [setResult])
    const onSubmit = data => {
        reset()
        if (data.answer === questions[count].correct_answer) {
            setMarks(marks + 1)
        }
        if (count < questions.length - 1) {
            setCount(count + 1)

        } else {
            alert('Thanks')
            navigate('/')
            makeResult(marks)
            addResult(marks, questions, catagory)
            // setResult('a')
        }
    };

    useEffect(() => {
        if (questions.length === 0 && signed === true) {
            startQuiz()
        }
    }, [])

    if (status == 'loading') {
        return <h1 style={{ fontSize: 48, textAlign: 'center' }}>LOADING....</h1>
    }
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
                {status === 'idle' ?
                    <div className="w-3/4 max-w-lg bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">Question {count + 1}:</h2>
                        <hr />
                        <br />
                        <div className="flex flex-col space-y-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <label className='text-xl' htmlFor="question">{questions[count].question}</label>
                                <div className='my-2 flex gap-2 items-center'>
                                    <input type="radio" id="a" {...register('answer', { required: true })} value="answer_a" />
                                    <label htmlFor="a">{questions[count].answers.answer_a}</label>
                                </div>
                                <div className='my-2 flex gap-2 items-center'>
                                    <input type="radio" id="b" {...register('answer', { required: true })} value="answer_b" />
                                    <label htmlFor="b">{questions[count].answers.answer_b}</label>
                                </div>
                                {questions.length != 0 && questions[count].answers.answer_c != null ?
                                    <div className='my-2 flex gap-2 items-center'>
                                        <input type="radio" id="c" {...register('answer', { required: true })} value="answer_c" />
                                        <label htmlFor="c">{questions[count].answers.answer_c}</label>
                                    </div>
                                    : null}
                                {questions.length != 0 && questions[count].answers.answer_d != null ?
                                    <div className='my-2 flex gap-2 items-center'>
                                        <input type="radio" id="d" {...register('answer', { required: true })} value="answer_d" />
                                        <label htmlFor="d">{questions[count].answers.answer_d}</label>
                                    </div>
                                    : null}
                                {questions.length != 0 && questions[count].answers.answer_e != null ?
                                    <div className='my-2 flex gap-2 items-center'>
                                        <input type="radio" id="e" {...register('answer', { required: true })} value="answer_e" />
                                        <label htmlFor="e">{questions[count].answers.answer_e}</label>
                                    </div>
                                    : null}
                                {errors.answer && <span role="alert">Please select at least one option</span>}
                                <div className='flex justify-end'>
                                    {count < questions.length - 1 ?
                                        <button type='submit' className="bg-green-600 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-700">Next</button> :
                                        <button type='submit' className="bg-green-800 text-white py-2 px-4 rounded-lg mt-6 hover:bg-green-900">Submit</button>
                                    }
                                </div>
                            </form>

                        </div>
                    </div >
                    : <h1 style={{ fontSize: 48, textAlign: 'center' }}> Opss! Something Went Wrong</h1>}
            </div >
        </>
    );
}

export default memo(QuizPage);
