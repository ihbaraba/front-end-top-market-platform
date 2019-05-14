const initialUserState = {
    selectedCategory: ''
}

export default function userState(state = {...initialUserState}, action) {
    const {payload} = action;
    console.log(payload);

    switch (action.type) {
        case 'UPDATE_PROFILE':
            return {
                ...state,
                ...payload
            };

        case 'CHANGE_CATEGORY':
            return {
                ...state,
                ...payload
            };

        default:
            return state
    }
}