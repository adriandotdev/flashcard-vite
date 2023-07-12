import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

function MessageModal({ modalContent, isMessageError, dispatch }) {

    const modalRef = useRef()

    useEffect(() => {

        gsap.to(modalRef.current, { opacity: 1, marginTop: "0px", duration: .3 })
    }, [])

    // Close the message modal after 3 seconds.
    setTimeout(() => {

        dispatch({ type: 'HIDE_MESSAGE_MODAL', payload: { isMessageModalOpen: false, modalContent: '', isMessageError: false } })
    }, 1100)

    return (
        <>
            <div ref={modalRef} className={`max-w-xs w-auto fixed z-100 top-32 left-1/2 transform -translate-x-1/2 py-3 px-5 shadow-lg opacity-0 -mt-10 rounded-md md:top-auto md:bottom-10 md:right-10 md:left-auto md:transform-none ${isMessageError ? "bg-red-400" : "bg-green-400"}`}>
                <h1 className="text-center font-semibold">{modalContent}</h1>
            </div>
        </>
    )
}

export default MessageModal
