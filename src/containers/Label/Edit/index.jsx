import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Input, Button, Breadcrumb, Radio } from 'antd';
import { connect } from 'react-redux';
import * as actions from 'Actions/labelEdit';
import { push } from 'react-router-redux';

// css
import './index.styl';

const { Item: FormItem } = Form;
const { Item: BreadcrumbItem } = Breadcrumb;
const { Group: RadioGroup } = Radio;
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const tailFormItemLayout = {
    wrapperCol: {
        span: 24,
        offset: 6,
    },
};

class LabelEdit extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { id, fetchLabelEdit } = this.props;

        if (id) {
            fetchLabelEdit({ id });
        }
    }

    async handleSubmit(e) {
        // 阻止表单的默认事件
        e.preventDefault();

        const { id, fetchSubmit, fetchLabelUpdate, push, form: { validateFields } } = this.props;
        let params;

        validateFields((errors, values) => {

            if (errors) {
                return;
            }

            params = {
                ...values,
                id,
            }
        });

        try {
            await id ? fetchLabelUpdate(params) : fetchSubmit(params) ;
        } catch (e) {
            return;
        }

        push('/label');

    }

    render() {
        const { info: { name }, form: { getFieldDecorator } } = this.props;

        const nameDecorator = getFieldDecorator('name', {
            initialValue: name,
            rules: [
                { required: true, message: '请输入账号名' }
            ],
        });

        return (
            <div className="user-edit-wrapper">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/label">标签管理</Link></BreadcrumbItem>
                    <BreadcrumbItem>编辑</BreadcrumbItem>
                </Breadcrumb>
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <FormItem label="标签名称" {...formItemLayout}>
                        {nameDecorator(
                            <Input placeholder="请输入标签名称" />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">保存</Button>
                        <Link to="/manage"><Button size="large">返回</Button></Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({ labelEdit }, { location: { query } }) => {
    const { info } = labelEdit;
    const { id } = query;

    return {
        id,
        status: !id,
        info,
    };
};

const mapDispatchToProps = { ...actions, push };

LabelEdit.propTypes = {
    id: PropTypes.string,
    info: PropTypes.object.isRequired,
    fetchSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LabelEdit));
