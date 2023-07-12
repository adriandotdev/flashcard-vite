import React, { useRef, useEffect } from 'react'
import Button from './Button'
import { gsap } from 'gsap'

function ConfirmationModal({ categoryName, isFlashcardOpen, dispatch }) {

    const modalRef = useRef()

    // This is the useEffect for animation only
    useEffect(() => {

        gsap.to(modalRef.current, { opacity: 1, translateY: "0px", duration: .2 })
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    return (
        <div className="fixed min-h-screen min-w-full top-0 flex items-end justify-center md:items-center z-10 bg-black bg-opacity-50">
            <div ref={modalRef} className="transform translate-y-24 md:-translate-y-24 bg-gray-900 px-3 pt-2 pb-8 md:pb-5 rounded-tl-2xl rounded-tr-2xl md:rounded-bl-2xl md:rounded-br-2xl flex flex-col gap-4 md:w-96 max-h-72 h-full w-full shadow-2xl">

                <section className='py-5 px-2'>
                    {isFlashcardOpen ? <p className="font-semibold text-white text-lg">Do you want to delete this question?</p> : <p className="font-semibold text-white text-lg">Are you sure you want to delete <span className="text-red-200">{categoryName}</span> category?</p>}
                    <span className="text-red-400 font-bold">This action cannot be undone</span>
                </section>

                <section className="flex gap-2 justify-end my-auto">
                    <Button
                        // EVENT HANDLER OF BUTTON
                        handler={isFlashcardOpen ?
                            () => {
                                dispatch({ type: 'DELETE_QUESTION' })
                                dispatch({ type: 'SHOW_CONFIRMATION', payload: { isConfirmationModalOpen: false, categoryID: 0, categoryName: '' } })
                                dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Question Deleted Succesfully!', isMessageError: false } })
                            }
                            : () => {
                                dispatch({ type: 'REMOVE_CATEGORY' })
                                dispatch({ type: 'SHOW_MESSAGE_MODAL', payload: { isMessageModalOpen: true, modalContent: 'Deleted Succesfully', isMessageError: false } })
                            }}
                        className="bg-red-900 text-white rounded-lg font-bold py-2 px-2 hover:bg-red-800 shadow w-32 md:w-32"
                        text="Yes"
                    >
                        Confirm
                    </Button>

                    <Button
                        // EVENT HANDLER OF BUTTON
                        handler={() => {
                            dispatch({ type: 'SHOW_CONFIRMATION', payload: { isConfirmationModalOpen: false, categoryID: 0, categoryName: '' } })
                        }}
                        className="bg-transparent border border-gray-600 text-white rounded-lg font-bold py-2 px-2 hover:bg-gray-800 shadow w-32 md:w-32"
                        text="No"
                    >
                        Cancel
                    </Button>
                </section>
            </div>
        </div>
    )
}

export default ConfirmationModal
