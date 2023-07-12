import React, { useEffect, useState, useRef } from 'react'
import Button from './Button'
import { gsap } from 'gsap'

function UpdateQuestionModal({ dispatch, questionToBeUpdated, answerToBeUpdated }) {

    const divRef = useRef()

    useEffect(() => {

        gsap.to(divRef.current, { opacity: 1, translateY: '0px', duration: .2 })

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    const [question, setQuestion] = useState(questionToBeUpdated)
    const [answer, setAnswer] = useState(answerToBeUpdated)

    return (
        <div className="fixed min-h-screen min-w-full top-0 flex items-end justify-center md:items-center z-10 bg-black bg-opacity-50">
            <div ref={divRef} className="transform translate-y-24 md:-translate-y-24 bg-gray-900 px-3 py-2 rounded-lg flex flex-col gap-4 md:w-96 w-full shadow-2xl rounded-tl-2xl rounded-tr-2xl md:rounded-bl-2xl md:rounded-br-2xl pb-5">
                <div className="flex flex-col items-stretch">
                    <label className="font-semibold text-white py-2" htmlFor="updated-question">
                        Updated Question:
                    </label>
                    <input value={question} onChange={(e) => setQuestion(e.target.value)} className="border border-black py-2 px-1" type="text" name="updated-question" id="updated-question" />
                </div>
                <div className="flex flex-col items-stretch">
                    <label className="font-semibold text-white py-2" htmlFor="updated-answer">
                        Updated Answer:
                    </label>
                    <input value={answer} onChange={(e) => setAnswer(e.target.value)} className="border border-black py-2 px-1" type="text" name="updated-answer" id="updated-answer" />
                </div>
                <div className="flex flex-col md:flex-row justify-end gap-3">

                    <Button
                        handler={() => {

                            if (question && answer) {
                                dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Question updated successfully!', isMessageError: false } })
                                dispatch({ type: 'UPDATE_QUESTION', payload: { question: question, answer: answer } })
                            }
                            else
                                dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Question and answer must not be empty.', isMessageError: true } })
                        }}
                        className="bg-gray-800 font-bold py-2 px-2 hover:bg-gray-600 shadow text-white rounded-md transition-all transform md:hover:scale-110"
                        text="Update" >
                        Update
                    </Button>

                    <Button
                        handler={() => {
                            dispatch({ type: 'SHOW_UPDATE_QUESTION_MODAL', payload: false })
                        }}
                        className="bg-red-900 font-bold py-2 px-3 hover:bg-red-800 shadow text-white rounded-md transition-all transform md:hover:scale-110"
                        text="Cancel" >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateQuestionModal
