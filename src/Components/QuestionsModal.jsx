/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react'
import Button from './Button'
import { gsap } from 'gsap'
import { FaPen, FaTrash } from 'react-icons/fa6';

function QuestionsModal({ dispatch, currentIndex, categories, questions }) {

    // ANIMATIONS
    const divRef = useRef()

    useEffect(() => {

        gsap.to(divRef.current, { opacity: 1, translateY: '0', duration: .2 });

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    const [currentQuestions, setCurrentQuestions] = useState(questions)
    const [isShow, setShow] = useState(false)
    const [index, setIndex] = useState(currentIndex !== -1 ? currentIndex : 0)
    const [content, setContent] = useState({
        id: currentQuestions.length > 0 ? currentQuestions[index]?.id : '',
        question: currentQuestions.length > 0 ? currentQuestions[index]?.question : '',
        answer: currentQuestions.length > 0 ? currentQuestions[index]?.answer : ''
    })

    useEffect(() => {


        if (questions.length > 0) {

            setContent({
                id: questions[index]?.id,
                question: questions[index]?.question,
                answer: questions[index]?.answer
            })
        }
    }, [index])

    useEffect(() => {

        setCurrentQuestions(questions)
        setIndex(currentIndex !== -1 ? currentIndex : 0)

        let mustIndex = currentIndex !== -1 ? currentIndex : 0

        if (questions.length > 0) {

            setContent({
                id: questions[mustIndex]?.id,
                question: questions[mustIndex]?.question,
                answer: questions[mustIndex]?.answer
            })
        }
    }, [questions])

    return (
        <div className="fixed min-h-screen min-w-full top-0 flex items-end justify-center md:items-center bg-black bg-opacity-50">
            <div ref={divRef} className="transform translate-y-24 md:-translate-y-24 bg-gray-900 px-3 py-2 rounded-lg flex flex-col gap-4 md:w-96 w-full shadow-2xl rounded-tl-2xl rounded-tr-2xl md:rounded-bl-2xl md:rounded-br-2xl">

                <section className="self-end cursor-pointer mb-2 mx-2 my-1" onClick={() => dispatch({ type: 'CLOSE_FLASHCARD', payload: { isFlashcardOpen: false } })}>

                    <a className='block w-5'>
                        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" /></svg>
                    </a>
                </section>

                {currentQuestions.length > 0 && <div className="bg-gray-100  px-3 flex flex-col justify-between border border-white w-full   rounded-xl" onClick={() => setShow(!isShow)}>

                    <div className="flex flex-col justify-center mt-3">

                        {/* Question */}
                        <p className="text-center font-mono text-lg font-bold mb-4 break-words select-none">{content.question}</p>

                        {
                            isShow ?
                                <p className="select-none text-center cursor-pointer text-green-700 text-2xl break-word font-bold">{content.answer}</p> : <p className="select-none text-center text-yellow-900 text-2xl break-words cursor-pointer font-bold">Show Answer</p>}
                    </div>

                    <div className="py-2 pt-10 px-2 flex justify-evenly">
                        {/* UPDATE BUTTON */}
                        <Button
                            handler={(e) => {
                                e.stopPropagation()
                                dispatch({ type: 'SHOW_UPDATE_QUESTION_MODAL', payload: true })
                                dispatch({ type: 'SETUP_UPDATE_QUESTION_MODAL', payload: { index: index, questionID: questions[index].id, question: questions[index].question, answer: questions[index].answer } })
                            }}
                            className="font-bold text-2xl text-blue-900"
                            text="Update" >

                            <FaPen />
                        </Button>

                        {/* DELETE BUTTON */}
                        <Button
                            handler={(e) => {
                                e.stopPropagation();
                                dispatch({ type: 'SETUP_UPDATE_QUESTION_MODAL', payload: { index: -1, questionID: '', question: '', answer: '' } })
                                { dispatch({ type: 'DELETE_QUESTION_CONFIRMATION', payload: content.id }) }
                            }}
                            className="font-bold text-2xl text-red-900"
                            text="Delete" >
                            <FaTrash />
                        </Button>
                    </div>
                </div>}

                {currentQuestions.length > 0 && <div className="flex justify-evenly items-center">
                    {/* <Button 
                        handler={() => {
                            
                            setIndex(index - 1 < 0 ? currentQuestions.length - 1 : index - 1)
                            setShow(false)
                        }}
                        className="font-bold text-white text-xl" 
                        text="Previous"/>  */}

                    <a onClick={() => {

                        setIndex(index - 1 < 0 ? currentQuestions.length - 1 : index - 1)
                        setShow(false)
                    }} className='w-8 cursor-pointer'>
                        <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z" /></svg>
                    </a>

                    <span className="select-none text-white text-2xl font-bold">{`${index + 1}/${currentQuestions.length}`}</span>

                    <a onClick={() => {
                        setIndex(
                            index + 1 > currentQuestions.length - 1 ? 0 : index + 1
                        )
                        setShow(false)
                    }} className='w-8 cursor-pointer'>
                        <svg fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><path d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" /></svg>
                    </a>
                    {/* <Button 
                        handler={() => {
                            setIndex(
                                index + 1 > currentQuestions.length - 1 ? 0 : index + 1
                            )
                            setShow(false)
                        }}
                        className="font-bold text-white text-xl" 
                        text="Next" /> */}
                </div>}

                {currentQuestions.length < 1 && <div className='flex flex-col items-center'>


                    <svg style={{ fill: 'white' }} className='w-24 white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                    </svg>

                    <h1 className="p-8 text-center font-bold text-2xl text-white">There are no created questions</h1>
                </div>}

            </div>
        </div>
    )
}

export default QuestionsModal
