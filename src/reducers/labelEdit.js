import * as api from 'Constants/api';
import * as actionType from 'Constants/actionType';

const initState = {
    info: {},
}

export default function labelEdit(state = initState, { type, payload }) {
    switch (type) {
    case actionType.LABEL_EDIT_INFO: {
        const { data: { info } } = payload;
        return {
            ...state,
            info
        };
    }
    default:
        return state;
    }
}
