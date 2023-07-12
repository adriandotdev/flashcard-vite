export const reducer = (state, action) => {

  /** SHOW_MODAL action
   * 
   * It sets the 'modalOpen' state to true.
   */
  if (action.type === 'SHOW_MODAL') {

    let categoryLength = 45
    let descriptionLength = 45

    return {
      ...state,
      isModalOpen: true,
      categoryLength: categoryLength,
      descriptionLength: descriptionLength,
    }
  }
  /** =========================== END OF SHOW_MODAL ACTION ========================= */

  if (action.type === 'SHOW_QUESTION_MODAL') {

    return {
      ...state,
      isModalOpen: true,
      addQuestion: {
        isAddQuestionModalOpen: true,
        categoryID: action.payload
      }
    }
  }

  /** ===================== CLOSE_MODAL ===================== */
  if (action.type === 'CLOSE_MODAL') {
    return {
      ...state,
      isModalOpen: false,
      addQuestion: {
        isAddQuestionModalOpen: false,
        categoryID: 0
      }
    }
  }
  /** ================================= END OF CLOSE_MODAL ================================= */

  /**  CHANGE THE CATEGORY LENGTH VALUE */
  if (action.type === 'CHANGE_CATEGORY_VALUE') {

    let originalLength = 45
    let newCategoryLength = originalLength - action.payload.length

    return {
      ...state,
      categoryLength: newCategoryLength
    }
  }
  /** ==============================END OF CHANGE_CATEGORY_VALUE=================================== */

  /** CHANGE THE DESCRIPTION LENGTH VALUE */
  if (action.type === 'CHANGE_DESCRIPTION_VALUE') {

    let originalLength = 45
    let newDescriptionLength = originalLength - action.payload.length

    if (newDescriptionLength < 0)
      return state

    return {
      ...state,
      descriptionLength: newDescriptionLength
    }
  }

  /*********************************
   * 
   * AN ACTION FOR 'ADDING CATEGORY' 
   * 
   ********************************/
  if (action.type === 'ADD_CATEGORY') {

    const newCategories = [...state.categories, { ...action.payload, id: new Date().getTime().toString() }]

    localStorage.setItem('categories', JSON.stringify(newCategories))

    return {
      ...state,
      categories: newCategories,
      isModalOpen: false,
    }
  } // END OF ADD_CATEGORY ACTION ==

  /*********************************
   * 
   * AN ACTION FOR 'REMOVING CATEGORY' 
   * 
   * The category is removed based on its 'UNIQUE ID'
   * 
   ********************************/
  if (action.type === 'REMOVE_CATEGORY') {

    const newCategories = JSON.parse(localStorage.getItem('categories')).filter(category => {

      return category.id !== state['delete'].categoryID
    })

    localStorage.setItem('categories', JSON.stringify(newCategories))

    return {
      ...state,
      categories: newCategories,
      delete: {
        categoryName: '',
        isConfirmationModalOpen: false,
        categoryID: 0
      }
    }
  } // END OF REMOVE_CATEGORY ACTION ==

  /*******************************
   * 
   * AN ACTION FOR SHOWING THE CONFIRMATION MODAL
   * 
   *******************************/
  if (action.type === 'SHOW_CONFIRMATION') {

    return {
      ...state,
      delete: {
        categoryName: action.payload.categoryName,
        isConfirmationModalOpen: action.payload.isConfirmationModalOpen,
        categoryID: action.payload.categoryID
      }
    }
  }

  // FOR SHOWING THE MESSAGE MODAL
  if (action.type === 'SHOW_MESSAGE_MODAL' || action.type === 'HIDE_MESSAGE_MODAL') {

    let newObj = { ...state.message, isMessageModalOpen: action.payload.isMessageModalOpen, modalContent: action.payload.modalContent, isMessageError: action.payload.isMessageError }
    return {

      ...state,
      message: newObj
    }
  }

  // SHOW UPDATE MODAL
  if (action.type === 'SHOW_UPDATE_MODAL') {

    let newObj = { ...state.update, isUpdateModalOpen: action.payload.isUpdateModalOpen, updateCategoryContent: action.payload.category, updateDescriptionContent: action.payload.description, categoryID: action.payload.categoryID }

    return {
      ...state,
      isModalOpen: action.payload.isUpdateModalOpen,
      update: newObj,
    }
  }

  // EVENTS FOR UPDATING THE SPECIFIC CATEGORY.
  if (action.type === 'UPDATE_CATEGORY') {

    let newCategories = JSON.parse(localStorage.getItem('categories')).map(category => {

      if (state.update.categoryID === category['id']) {

        return {

          ...category,
          category: action.payload.category,
          description: action.payload.description
        }
      }
      return category
    })

    localStorage.setItem('categories', JSON.stringify(newCategories))

    return {
      ...state,
      categories: newCategories,
      isModalOpen: false,
      categoryLength: 25,
      descriptionLength: 45,
      update: {
        isUpdateModalOpen: false,
        updateCategoryContent: '',
        updateDescriptionContent: '',
        categoryID: 0
      }
    }
  }

  /************************************************************************************************ 
   * 
   * An 'action' for adding a question. This will get triggered if the 'ADD' button in the question 
   * modal is clicked.
   * 
   * (Need to refactor)
   ************************************************************************************************/
  if (action.type === 'ADD_QUESTION') {

    let newQuestion = action.payload.question
    let newAnswer = action.payload.answer
    let currentCategories = state.categories

    let newCategory = currentCategories.map(category => {

      if (category.id === state['addQuestion'].categoryID) {

        let newSetOfQuestions = [...category.questions, { question: newQuestion, answer: newAnswer, id: new Date().getTime().toString() }]
        return {

          ...category,
          questions: newSetOfQuestions
        }
      }
      return category
    })

    localStorage.setItem('categories', JSON.stringify(newCategory))

    return {
      ...state,
      categories: newCategory
    }
  }

  if (action.type === 'DELETE_QUESTION_CONFIRMATION') {

    // The value of the current 'openFlashcard' property.
    let currentOpenFlashcard = state.openFlashcard

    return {
      ...state,
      delete: {
        isConfirmationModalOpen: true
      },
      openFlashcard: {
        ...currentOpenFlashcard,
        questionID: action.payload
      }
    }
  }

  if (action.type === 'DELETE_QUESTION') {

    let newQuestions = []
    let currentOpenFlashcardValue = state.openFlashcard
    let newCategory = state.categories.map(category => {

      if (category.id === state.openFlashcard.categoryID) {

        newQuestions = category.questions.filter(question => question.id !== state.openFlashcard.questionID)

        category.questions = newQuestions

        return category
      }
      return category
    })

    localStorage.setItem('categories', JSON.stringify(newCategory))

    return {
      ...state,
      categories: newCategory,
      openFlashcard: {
        ...currentOpenFlashcardValue,
        questions: newQuestions
      }
    }
  }

  if (action.type === 'OPEN_FLASHCARD' || action.type === 'CLOSE_FLASHCARD') {

    /**When this action dispatches, it will find the category that matches
     * the categoryID from the payload. */
    let currentCategory = state.categories.filter(category => {

      return category.id === action.payload.categoryID
    })

    /** SET the openFlashcard object in the state. */
    return {
      ...state,
      openFlashcard: {
        isFlashcardOpen: action.payload.isFlashcardOpen,
        categoryID: action.payload.isFlashcardOpen ? action.payload.categoryID : 0,
        questionID: action.payload.isFlashcardOpen ? currentCategory[0].questions[0]?.id : 0,
        questions: action.payload.isFlashcardOpen ? currentCategory[0].questions : []
      }
    }
  }

  /** This action is for showing the UpdateQuestionModal */
  if (action.type === 'SHOW_UPDATE_QUESTION_MODAL') {

    return {
      ...state,
      updateModal: {
        isUpdateQuestionModalOpen: action.payload
      }
    }
  }

  /** This action is for setting the current question
   * to be updated on the textfields of UpdateQuestionModal
   */
  if (action.type === 'SETUP_UPDATE_QUESTION_MODAL') {

    const currentUpdateModal = state.updateModal

    return {
      ...state,
      updateModal: {
        ...currentUpdateModal,
        questionID: action.payload.questionID,
        question: action.payload.question,
        answer: action.payload.answer,
        index: action.payload.index
      }
    }
  }

  /** An action for updating a question */
  if (action.type === 'UPDATE_QUESTION') {

    let newSetOfQuestions = []
    let currentOpenFlashcard = state.openFlashcard
    let currentUpdateModal = state.updateModal
    let categoryID = state.openFlashcard.categoryID

    let newCategories = state.categories.map(category => {

      if (category.id === categoryID) {

        newSetOfQuestions = category.questions.map(question => {

          if (question.id === state.updateModal.questionID) {

            return { id: question.id, question: action.payload.question, answer: action.payload.answer }
          }
          return question
        })

        category.questions = newSetOfQuestions
        return category
      }
      return category
    })

    localStorage.setItem('categories', JSON.stringify(newCategories))

    return {

      ...state,
      categories: newCategories,
      openFlashcard: {
        ...currentOpenFlashcard,
        questions: newSetOfQuestions
      },
      updateModal: {
        ...currentUpdateModal,
        isUpdateQuestionModalOpen: false
      }

    }
  }
}