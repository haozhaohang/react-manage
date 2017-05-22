import { api, actionType } from 'Constants';
import { post, get } from 'Assets/js/request';
import { actionCreator } from 'Assets/js/util';
import { message } from 'antd';

const finishEdit = actionCreator(actionType.LABEL_EDIT_INFO);

// 新增标签
export const fetchSubmit = (params = {}) => () => post(api.API_LABEL_ADD, params);

// 获取标签信息
export function fetchLabelEdit(opts ={}) {
    return async (dispatch) => {
        const params = Object.assign({}, opts);
        let payload = {
            data: {
                info: {}
            }
        };

        try {
            payload = await get(api.API_LABEL_EDIT, params)
        } catch (e) {
            throw e;
        }

        dispatch(finishEdit(payload));
    }
}

// 更新标签数据
export const fetchLabelUpdate = (params ={}) => () => post(api.API_LABEL_UPDATE, params)
