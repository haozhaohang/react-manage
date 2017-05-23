import * as api from 'Constants/api';
import * as actionType from 'Constants/actionType';

const initState = {
    info: {},
    labelList: []
}

export default function contentEdit(state = initState, { type, payload }) {
    switch (type) {
    case actionType.CONTENT_EDIT_INFO: {
        const { data: { info } } = payload;
        return {
            ...state,
            info,
        };
    }
    case actionType.CONTENT_LABEL_LIST: {
        const { data: { list } } = payload;

        return {
            ...state,
            labelList: list,
        };
    }
    default:
        return state;
    }
}
