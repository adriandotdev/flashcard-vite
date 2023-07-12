import React, { useState, useEffect, useRef } from 'react'
import Button from './Button'
import { gsap } from "gsap"

function AddFlashcardModal({
    categoryLength,
    descriptionLength,
    isModalOpen,
    dispatch,
    isUpdateModalOpen,
    updateCategoryContent,
    updateDescriptionContent,
    isAddQuestionModalOpen }) {

    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const divRef = useRef()

    /** Use effect for animations of the modal */
    useEffect(() => {

        if (window.innerWidth >= 768)
            gsap.to(divRef.current, { opacity: 1, translateY: "0", duration: .2 });
        else
            gsap.to(divRef.current, { opacity: 1, translateY: "0", duration: .2, ease: "ease" });

        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflowY = 'auto';
        }
    }, [])

    /** useEffect for setting up the value of
     * category and description when the modal is closed. */
    useEffect(() => {

        if (!isModalOpen) {
            setCategory('')
            setDescription('')
        }

    }, [isModalOpen])

    /** Checks if the the update modal is open 
     * so that we can set the value of the clicked
     * category to the input fields. */
    useEffect(() => {

        if (isUpdateModalOpen) {

            setCategory(updateCategoryContent)
            setDescription(updateDescriptionContent)
        }

    }, [isUpdateModalOpen])

    /** ITO AY ANG USE EFFECT
     * PARA MALAMAN KUNG ANONG LENGTH NA 
     * NG INPUT SA CATEGORY AND DESCRIPTION. */
    useEffect(() => {

        dispatch({ type: 'CHANGE_CATEGORY_VALUE', payload: category })
    }, [category])

    useEffect(() => {

        dispatch({ type: 'CHANGE_DESCRIPTION_VALUE', payload: description })
    }, [description])

    // END OF USE EFFECTS
    //fixed opacity-0 -mt-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-3 py-2 rounded-lg flex flex-col gap-4 sm:w-96 shadow-2xl border border-white

    return (
        <div className="fixed min-h-screen min-w-full top-0 flex items-end justify-center md:items-center bg-black bg-opacity-50">
            <div ref={divRef} className="transform translate-y-24 md:-translate-y-24 bg-gray-900 px-5 py-3 rounded-lg flex flex-col gap-4 md:w-96 w-full shadow-2xl rounded-tl-2xl rounded-tr-2xl md:rounded-bl-2xl md:rounded-br-2xl">

                {/* TEXTFIELD */}
                <section className="flex flex-col">

                    <section className="flex items-center justify-between">
                        <label className="text-white py-1 font-bold" htmlFor="question">{isAddQuestionModalOpen ? "Question:" : "Category Name:"}</label>

                        {/* Only show when the modal is not for ADDING A QUESTION MODAL */}
                        {!isAddQuestionModalOpen && <small className="text-white font-mono font-medium">{categoryLength}/45</small>}
                    </section>

                    <input placeholder={!isAddQuestionModalOpen ? 'Solar System...' : 'What is the third planet of our solar system?'} value={!isAddQuestionModalOpen ? category : question} onInput={!isAddQuestionModalOpen ? (e) => {

                        // Check if the number of characters is empty.
                        45 - e.target.value.length === -1 ? setCategory(prevValue => prevValue) : setCategory(e.target.value)

                    } : (e) => { setQuestion(e.target.value) }} className="border border-black py-2 px-1" type="text" name="" id="" autoFocus />
                </section>

                {/* TEXTAREA */}
                <section className="flex flex-col">

                    <section className="flex items-center justify-between">
                        <label className="text-white py-1 font-bold" htmlFor="answer">{isAddQuestionModalOpen ? "Answer: " : "Description (Optional): "}</label>

                        {/* Only show when the modal is not for ADDING A QUESTION MODAL */}
                        {!isAddQuestionModalOpen && <small className="text-white font-mono font-medium">{descriptionLength}/45</small>}
                    </section>

                    {isAddQuestionModalOpen ?
                        <input placeholder='Earth...' value={answer} onInput={(e) => setAnswer(e.target.value)} className="border border-black py-2 px-1" type="text" name="" id="" />
                        :
                        <textarea placeholder='This is about solar system...' value={description} onInput={(e) => {

                            // Check if the number of characters is empty.
                            45 - e.target.value.length === -1 ? setDescription(prevValue => prevValue) : setDescription(e.target.value)

                        }} className="border border-black py-2 px-1" name="" id="" cols="30" rows="3"></textarea>}
                </section>

                {/* BUTTON SECTION */}
                <section className="flex flex-col md:flex-row justify-end gap-2 pb-2 pl-1">
                    <Button
                        handler={

                            /*****************************************************************
                             * 
                             * This is the event when the user wants to add a question.
                             * We are using the same modal but we only change some of its
                             * structure and event in this button.
                             * 
                             ****************************************************************/
                            isAddQuestionModalOpen ? () => {

                                if (question && answer) {
                                    dispatch({ type: 'ADD_QUESTION', payload: { question: question, answer: answer } })
                                    dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Question added successfully!', isMessageError: false } })
                                    setQuestion('')
                                    setAnswer('')
                                }
                                else {
                                    dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Question and Answer field must not be empty.', isMessageError: true } })
                                }
                            } :
                                /*****************************************************************
                                 * IF THE UPDATE MODAL IS OPEN, THIS IS THE 'DEFAULT' EVENT.
                                 ****************************************************************/
                                isUpdateModalOpen ? () => {

                                    if (category) {

                                        dispatch({ type: 'UPDATE_CATEGORY', payload: { category: category, description: description } })
                                        dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Successfully Updated', isMessageError: false } })
                                    }
                                    else {
                                        dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Input field empty', isMessageError: true } })
                                    }

                                } :
                                    /*****************************************************************
                                     * IF THE UPDATE MODAL IS NOT OPEN, THIS IS THE 'DEFAULT' EVENT.
                                     ****************************************************************/
                                    () => {

                                        // If update modal is not open this is the required event.
                                        if (category) {
                                            dispatch({ type: 'ADD_CATEGORY', payload: { category: category, description: description, questions: [] } })
                                            dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Category Added', isMessageError: false } })
                                        }
                                        else
                                            dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Input field empty', isMessageError: true } })
                                    }}
                        className="bg-gray-800 text-white font-bold py-2 px-3 transition-transform transform md:hover:scale-110 hover:bg-gray-600 shadow rounded-md"
                        text={isUpdateModalOpen ? "Update" : "Add"}
                    >
                        {isUpdateModalOpen ? "Update" : "Add"}
                    </Button>


                    {/* CANCEL BUTTON */}
                    <Button
                        handler={() => {

                            dispatch({ type: "CLOSE_MODAL" })
                            dispatch({ type: 'SHOW_UPDATE_MODAL', payload: { isUpdateModalOpen: false, category: '', description: '' } })

                        }}

                        className="bg-red-900 rounded-md p-3 font-bold text-white transition-all transform md:hover:scale-110 hover:bg-red-800 shadow"

                        text="Cancel" >
                        Cancel
                    </Button>
                </section>
            </div>
        </div>
    )
}

export default AddFlashcardModal
