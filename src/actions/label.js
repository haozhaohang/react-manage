import { api, actionType } from 'Constants';
import { get, post } from 'Assets/js/request';
import { actionCreator } from 'Assets/js/util';

const addRequest = actionCreator(actionType.LABEL_LIST_REQUEST);
const rejectRequest = actionCreator(actionType.LABEL_LIST_FAIL);
const finishLabelList = actionCreator(actionType.LABEL_LIST_SUCCESS);

// 获取标签列表
export function fetchList(params = {}) {
    return async (dispatch) => {
        dispatch(addRequest());

        let payload;

        try {
            payload = await get(api.API_LABEL_LIST, params);
        } catch (e) {
            dispatch(rejectRequest);
            throw e;
        }

        dispatch(finishLabelList(payload));
    };
}

// 删除标签
export const fetchLabelDel = (params = {}) => () => post(api.API_LABEL_DEL, params);
