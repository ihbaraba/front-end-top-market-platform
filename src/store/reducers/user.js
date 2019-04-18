export default function userState(state = {}, action) {
    const {payload} = action;
    console.log(action);

    switch (action.type) {
        case 'UPDATE_PROFILE':
            return {
                ...state,
                ...payload
            };

        default:
            return state
    }
}