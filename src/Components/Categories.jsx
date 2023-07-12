/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import Button from './Button'

import { FaPen, FaPlus, FaTrash } from "react-icons/fa6"
function Categories({ dispatch, categories, disabled }) {

    return (
        <div className=" px-4 py-2 md:px-8 flex gap-2 flex-wrap justify-center lg:justify-start">

            {categories && categories.map((category) => {

                return (
                    <section
                        tabIndex="0"
                        ariaLabel={`${category['category']}`}
                        role="button"
                        key={category.id}
                        className="flex flex-col jusitfy-around  gap-3 bg-gray-900 py-4 px-3 hover:scale-105 border-2 border-gray-800 max-w-sm w-full
                        shadow-2xl hover:bg-gray-900 hover:bg-opacity-90 cursor-pointer rounded-md transition-all"
                        onClick={
                            () => dispatch(
                                {
                                    type: 'OPEN_FLASHCARD',
                                    payload: {
                                        isFlashcardOpen: true,
                                        categoryID: category.id
                                    }
                                })}
                        onKeyDown={
                            (e) => {
                                if (e.key === "Enter" || e.keyCode === 13) {
                                    dispatch(
                                        {
                                            type: 'OPEN_FLASHCARD',
                                            payload: {
                                                isFlashcardOpen: true,
                                                categoryID: category.id
                                            }
                                        })
                                }
                            }
                        }
                    >

                        <section className='relative'>

                            {/* Category Title */}
                            <h1 className="text-2xl break-word text-white font-bold pt-4">{category['category']}</h1>

                            {/* Category Description */}
                            <p className="font-normal break-all text-white">{category['description']}</p>

                            {/* Number of Questions of current Category */}
                            <span className="text-white font-bold text-lg absolute right-0 -top-2">

                                {
                                    category['questions'].length === 0 ? "No Questions" :
                                        category['questions'].length === 1 ? "1 Question" :
                                            category['questions'].length + " Questions"
                                }
                            </span>
                        </section>

                        <section className="flex gap-2">

                            {/* ADD QUESTION BUTTON */}
                            <Button
                                disabled={disabled}
                                className="px-3 text-white font-semibold bg-green-600 hover:bg-green-700 rounded-full max-h-80 transition-transform transform hover:scale-110"
                                text=""
                                handler={(e) => {
                                    e.stopPropagation(); // to also avoid running the event of the whole category.
                                    dispatch({ type: 'SHOW_QUESTION_MODAL', payload: category.id })
                                }}
                            >
                                <FaPlus />
                            </Button>

                            {/* EDIT BUTTON */}
                            <Button
                                disabled={disabled}
                                className="bg-blue-900 text-white font-bold py-3 hover:bg-blue-800 shadow w-30 px-3 rounded-full transition-transform transform hover:scale-110"
                                text="&#9998;"
                                handler={(e) => {

                                    e.stopPropagation();
                                    dispatch({ type: 'SHOW_UPDATE_MODAL', payload: { isUpdateModalOpen: true, category: category['category'], description: category['description'], categoryID: category['id'] } })
                                }}
                            >
                                <FaPen />
                            </Button>

                            {/* This is the "Delete Button" for deleting the specific category 
                                DELETE BUTTON
                            */}
                            <Button
                                disabled={disabled}
                                className="bg-red-900 font-bold px-3 hover:bg-red-800 shadow rounded-full text-white transition-transform transform hover:scale-110"
                                text="&#9998;"
                                handler={(e) => {

                                    e.stopPropagation();
                                    dispatch({ type: 'SHOW_CONFIRMATION', payload: { isConfirmationModalOpen: true, categoryID: category.id, categoryName: category['category'] } })
                                }} >
                                <FaTrash />
                            </Button>
                        </section>
                    </section>
                )
            })}

        </div>
    )
}

export default Categories
