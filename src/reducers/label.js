import * as actionType from 'Constants/actionType';

const initState = {
    list: [],
    total: 0,
    loading: false,
    pageSize: 10,
};

export default function labelList(state = initState, { type, payload }) {
    switch (type) {
    case actionType.LABEL_LIST_REQUEST:
        return {
            ...state,
            loading: true,
        };
    case actionType.LABEL_LIST_FAIL:
        return {
            ...state,
            loading: false,
        };
    case actionType.LABEL_LIST_SUCCESS: {
        const { data: { list, total } } = payload;
        return {
            ...state,
            list,
            total,
            loading: false,
        };
    }
    default:
        return state;
    }
}
