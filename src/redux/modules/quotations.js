import {
  fetchQuotations,
  saveQuotation,
  getNewQuotationNumber,
  saveRecentQuotation,
  updateAllQuotationStatuses } from 'api/api'

const FETCHING_QUOTATIONS                 = 'FETCHING_QUOTATIONS'
const FETCHING_QUOTATIONS_FAILED          = 'FETCHING_QUOTATIONS_FAILED'
const FETCHING_QUOTATIONS_SUCCESS         = 'FETCHING_QUOTATIONS_SUCCESS'
const UPDATE_QUOTATION_STATUS             = 'UPDATE_QUOTATION_STATUS'
const ADD_NEW_QUOTATION                   = 'ADD_NEW_QUOTATION'

export const fetchingQuotations = () => {
  return {
    type: FETCHING_QUOTATIONS
  }
}

export const fetchingQuotationsFailed = (errorMessage) => {
  return {
    type: FETCHING_QUOTATIONS_FAILED,
    error: errorMessage
  }
}

export const fetchingQuotationsSuccess = (quotations) => {
  return {
    type: FETCHING_QUOTATIONS_SUCCESS,
    quotations
  }
}

export const updateQuotationStatus = (quotationId, quotationStatus) => {
  return {
    type: UPDATE_QUOTATION_STATUS,
    quotationId,
    quotationStatus
  }
}

const addNewQuotation = (newQuotation) => {
  return {
    type: ADD_NEW_QUOTATION,
    newQuotation
  }
}

// thunks
export const fetchAndHandleQuotations = (customerId) => {
  return (dispatch, getState) => {
    dispatch(fetchingQuotations())
    const userUid = getState().users.authedId
    fetchQuotations(userUid, customerId)
      .then((quotations) => {
        dispatch(fetchingQuotationsSuccess(quotations))
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchingQuotationsFailed(error))
      })
  }
}

export const saveNewQuotation = (customerId, quotation) => {
  return (dispatch, getState) => {
    const userUid = getState().users.authedId
    return getNewQuotationNumber()
      .then((quotationNumber) => saveQuotation(userUid, customerId, quotation, quotationNumber))
      .then((newQuotation) => {
        saveRecentQuotation(userUid, customerId, newQuotation.quotationNumber, newQuotation.quotationStatus)
        dispatch(addNewQuotation(newQuotation))
        return newQuotation.quotationNumber
      })
  }
}

export const updateAndHandleQuotationStatus = (customerId, quotationId, quotationStatus) => {
  return (dispatch, getState) => {
    const userUid = getState().users.authedId
    updateAllQuotationStatuses(userUid, customerId, quotationId, quotationStatus)
      .then(() => {
        dispatch(updateQuotationStatus(quotationId, quotationStatus))
      })
  }
}

const initialState = {
  isFetching: true,
  error: '',
  quotations: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCHING_QUOTATIONS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_QUOTATIONS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_QUOTATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        quotations: action.quotations
      }
    case ADD_NEW_QUOTATION:
      return {
        ...state,
        quotations: {
          [action.newQuotation.quotationNumber]: action.newQuotation
        }
      }
    case UPDATE_QUOTATION_STATUS:
      return {
        ...state,
        quotations: {
          [action.quotationId]: {
            quotationStatus: action.quotationStatus
          }
        }
      }
    default:
      return state
  }
}
