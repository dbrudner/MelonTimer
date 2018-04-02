export default function(state = false, action) {
    switch (action.type) {
        case 'OPEN_LOGIN':
            return action.payload;
    }
    return state
}