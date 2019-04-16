export default function userState(state = {}, action) {
    const {payload} = action;

    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                // user: {...state.user, request: "sent"},
                request: "sent",
            };

        default:
            return state
    }
}