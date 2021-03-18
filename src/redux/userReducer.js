import * as actions from "./actionTypes";

export const initialState = {
    users: []
};

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.ADD_USER:
            return {
                ...state,
                users: [action.user, ...state.users]
            };
        case actions.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.userId)
            };
        case actions.DELETE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? action.user : user)
            };
        default:
            return state;
    }
};

export default userReducer;