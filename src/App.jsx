import Header from './Components/Header'
import Categories from './Components/Categories'
import AddFlashcardModal from './Components/AddFlashcardModal'
import { useReducer } from 'react'
import { reducer } from './Javascripts/reducer'
import MessageModal from './Components/MessageModal'
import ConfirmationModal from './Components/ConfirmationModal'
import QuestionsModal from './Components/QuestionsModal'
import UpdateQuestionModal from './Components/UpdateQuestionModal'
import './index.css'

function App() {

  const initialState = {

    categories: JSON.parse(localStorage.getItem('categories')) || [],
    isModalOpen: false,
    categoryLength: 25,
    descriptionLength: 45,
    message: {
      isMessageModalOpen: false,
      modalContent: '',
      isMessageError: false
    },
    update: {
      isUpdateModalOpen: false,
      updateCategoryContent: '',
      updateDescriptionContent: '',
      categoryID: 0
    },
    delete: {
      categoryName: '',
      isConfirmationModalOpen: false,
      categoryID: 0
    },
    addQuestion: {
      isAddQuestionModalOpen: false,
      categoryID: 0
    },
    openFlashcard: {
      isFlashcardOpen: false,
      categoryID: 0,
      questionID: 0,
      questions: []
    },
    updateModal: {
      isUpdateQuestionModalOpen: false,
      questionID: 0,
      categoryID: 0,
      question: '',
      answer: '',
      index: -1
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  document.title = "Flashcards Go";

  return (
    <div className="bg-gradient-to-b from-blue-900 to-gray-900 min-h-screen">

      <Header disabled={state['delete'].isConfirmationModalOpen || state.openFlashcard.isFlashcardOpen || state.updateModal.isUpdateQuestionModalOpen} openModal={dispatch} />

      <Categories
        disabled={state.isModalOpen || state.delete.isConfirmationModalOpen || state.openFlashcard.isFlashcardOpen || state.updateModal.isUpdateQuestionModalOpen}
        dispatch={dispatch}
        categories={JSON.parse(localStorage.getItem('categories'))}
      />

      {state.isModalOpen &&
        <AddFlashcardModal
          categoryLength={state.categoryLength}
          descriptionLength={state.descriptionLength}
          isModalOpen={state.isModalOpen}
          dispatch={dispatch}
          isUpdateModalOpen={state.update.isUpdateModalOpen}
          updateCategoryContent={state.update.updateCategoryContent}
          updateDescriptionContent={state.update.updateDescriptionContent}
          isAddQuestionModalOpen={state.addQuestion.isAddQuestionModalOpen}
        />}

      {state.message.isMessageModalOpen &&

        <MessageModal
          modalContent={state.message.modalContent}
          isMessageError={state.message.isMessageError}
          dispatch={dispatch}
        />}
      {state['delete'].isConfirmationModalOpen && <ConfirmationModal categoryName={state['delete'].categoryName} isFlashcardOpen={state['openFlashcard'].isFlashcardOpen} dispatch={dispatch} />}

      {state['openFlashcard'].isFlashcardOpen && <QuestionsModal currentIndex={0} categories={state.categories} dispatch={dispatch} questions={state.openFlashcard.questions} />}

      {state.updateModal.isUpdateQuestionModalOpen && <UpdateQuestionModal dispatch={dispatch} questionToBeUpdated={state.updateModal.question} answerToBeUpdated={state.updateModal.answer} />}
    </div>
  );
}

export default App;
