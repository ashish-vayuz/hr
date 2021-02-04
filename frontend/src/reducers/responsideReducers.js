export const changeState = (state = {
    sidebarShow: 'responsive'
}, { type, ...rest }) => {
    switch (type) {
        case 'set':
            return { ...state, ...rest }
        default:
            return state
    }
}