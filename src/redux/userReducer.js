import * as actions from "./actionTypes";

export const initialState = {
    users: [
        {id: 3, name: "valery", lastName: "subbotin", birthday: "19.06.1999", gender: "male"},
        {id: 2 ,name: "sasha", lastName: "karpov", birthday: "21.03.1984", gender: "male"},
        {id: 1 ,name: "alisa", lastName: "tihonova", birthday: "06.11.2002", gender: "female"},
    ]
};

const userReducer = (state = initialState, action) => {
    switch (action.type){
        case actions.ADD_USER:
            action.user.id = state.users.length+1;
            action.user.birthday = action.user.birthday.split("-").reverse().join(".")
            return {
                ...state,
                users: [action.user, ...state.users]
            };
        case actions.DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => !action.deleted.find(deletedId => user.id === deletedId))
            };
        case actions.UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.userID ? action.user : user)
            };
        default:
            return state;
    }
};

export default userReducer;