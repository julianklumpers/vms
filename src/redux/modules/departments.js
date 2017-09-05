import { fetchDepartments, saveDepartment } from 'api/api'

const FETCHING_DEPARTMENTS          = 'FETCHING_DEPARTMENTS'
const FETCHING_DEPARTMENTS_SUCCESS  = 'FETCHING_DEPARTMENTS_SUCCESS'
const FETCHING_DEPARTMENTS_FAILED   = 'FETCHING_DEPARTMENTS_FAILED'
const ADD_NEW_DEPARTMENT            = 'ADD_NEW_DEPARTMENT'

export const fetchingDepartments = () => {
  return {
    type: FETCHING_DEPARTMENTS
  }
}

export const fetchingDepartmentsSuccess = (departments) => {
  return {
    type: FETCHING_DEPARTMENTS_SUCCESS,
    departments
  }
}

export const fetchingDepartmentsFailed = (errorMessage) => {
  return {
    type: FETCHING_DEPARTMENTS_FAILED,
    error: errorMessage
  }
}

const addNewDepartment = (newDepartment) => {
  return {
    type: ADD_NEW_DEPARTMENT,
    newDepartment
  }
}

// thunks
export const fetchAndHandleDepartments = (quotationId) => {
  return (dispatch, getState) => {
    const userUid = getState().users.authedId
    fetchDepartments(userUid, quotationId)
      .then((departments) => {
        console.log(departments)
        dispatch(fetchingDepartmentsSuccess(departments))
      })
      .catch((error) => {
        console.log(error)
        dispatch(fetchingDepartmentsFailed('Failed to fetch departments'))
      })
  }
}

export const saveNewDepartment = (quotationId, department) => {
  return (dispatch, getState) => {
    const userUid = getState().users.authedId
    return saveDepartment(userUid, quotationId, department)
      .then(() => dispatch(addNewDepartment(department)))
  }
}

const initialState = {
  isFetching: true,
  error: '',
  departments: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DEPARTMENTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_DEPARTMENTS_FAILED:
      return {
        ...state,
        error: action.error
      }
    case FETCHING_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        departments: action.departments
      }
    case ADD_NEW_DEPARTMENT:
      return {
        ...state,
        departments: {
          ...state.departments,
          [action.newDepartment.afdelingnaam]: action.newDepartment
        }
      }
    default:
      return state
  }
}
