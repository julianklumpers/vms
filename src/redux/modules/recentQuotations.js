import { fetchRecentQuotations } from 'api/api'

const FETCHING_RECENT_QUOTATIONS          = 'FETCHING_RECENT_QUOTATIONS'
const FETCHING_RECENT_QUOTATIONS_FAILED   = 'FETCHING_RECENT_QUOTATIONS_FAILED'
const FETCHING_RECENT_QUOTATIONS_SUCCESS  = 'FETCHING_RECENT_QUOTATIONS_SUCCESS'


export const fetchingRecentQuotations = () => {
  return {
    type: FETCHING_RECENT_QUOTATIONS,
  }
}

export const fetchingRecentQuotationsFailed = (errorMessage) => {
  return {
    type: FETCHING_RECENT_QUOTATIONS_FAILED,
    error: errorMessage
  }
}

export const fetchingRecentQuotationsSuccess = (recentQuotations) => {
  return {
    type: FETCHING_RECENT_QUOTATIONS_SUCCESS,
    recentQuotations
  }
}

// thunks

export const fetchAndHandleRecentQuotations = () => {
  return (dispatch, getState) => {
    dispatch(fetchingRecentQuotations())
    const userUid = getState().users.authedId
    fetchRecentQuotations(userUid)
      .then((recentQuotations) => {
        dispatch(fetchingRecentQuotationsSuccess(recentQuotations))
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchingRecentQuotationsFailed(error))
      })
  }
}

const initialState = {
  isFetching: true,
  error: '',
  recentQuotations: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case FETCHING_RECENT_QUOTATIONS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_RECENT_QUOTATIONS_FAILED:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_RECENT_QUOTATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recentQuotations: action.recentQuotations
      }
    default:
      return state
  }
}
