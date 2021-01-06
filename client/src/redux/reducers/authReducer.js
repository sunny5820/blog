import { CLEAR_REQUEST, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user:"",
    userId:"",
    userName:"",
    userRole:"",
    errorMsg:"",
    successMsg:""
};

const authRoutes = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_REQUEST:
            return {
                ...state,
                errorMsg:"",
                isLoading:true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem("token", action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userId:action.payload.userId,
                userRole:action.payload.userRole,
                errorMsg:""
            }
            case LOGIN_FAILURE:
            localStorage.removeItem("token")
            return {
                ...state,
                ...action.payload,
                isAuthenticated: null,
                isLoading: false,
                token:null,
                userId:null,
                userRole:null,
                errorMsg:action.payload.data.msg
            }
            case CLEAR_ERROR_REQUEST:
            return {
                ...state,
                errorMsg: null,
            }
            case CLEAR_ERROR_SUCCESS:
            return {
                ...state,
                errorMsg: null,
            }
            case CLEAR_ERROR_FAILURE:
            return {
                ...state,
                errorMsg: null,
            }
            default:
                return state
    }
}

export default  authReducer;
