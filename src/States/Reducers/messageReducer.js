export const messageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGE_TYPE':
            return {
                receiver_id: action.user.receiver_id,
                receiver_class: action.user.receiver_class,
                name: action.user.name
            }
        default:
            return state
    }
}