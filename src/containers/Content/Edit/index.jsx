import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Form, Input, Button, Breadcrumb, Select } from 'antd';
import { connect } from 'react-redux';
import * as actions from 'Actions/contentEdit';
import { goBack } from 'react-router-redux';
import Editor from 'Components/Editor';
import { commons } from 'Constants';

// css
import './index.styl';

const { Item: FormItem } = Form;
const { Item: BreadcrumbItem } = Breadcrumb;
const { Option } = Select;

const editorStyle = {
    width: "100%",
    height: "500px",
};

class ContentEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };

        this.handleSubmint = this.handleSubmint.bind(this);
    }

    componentDidMount() {
        const { id, fetchContentEdit, fetchLabelList } = this.props;

        fetchContentEdit({ id });
        fetchLabelList();
    }

    async handleSubmint() {
        const { id, fetchSubmit, fetchContentUpdate, goBack, form: { validateFields } } = this.props;
        const content = this.refs.edit.getContent();
        let params;

        validateFields((error, values) => {
            if (error) {
                return;
            }

            params = {
                ...values,
                id,
                content
            };
        })

        try {
            await id ?  fetchContentUpdate(params) : fetchSubmit(params);
        } catch (e) {
            return;
        }

        goBack();
    }


    render() {
        const { content } = this.state;
        const { id, info, labelList, form: { getFieldDecorator } } = this.props;

        const titleDecorator = getFieldDecorator('title', {
            initialValue: info.title,
            rules: [
                { required: true, type: 'string', message: '标题为必填参数' }
            ]
        });

        const classifyDecorator = getFieldDecorator('classify', {
            initialValue: info.classify,
            rules: [
                { required: true, type: 'string', message: '标题为必填参数' }
            ]
        });

        const labelDecorator = getFieldDecorator('label', {
            initialValue: info.label,
            rules: [
                { required: true, type: 'string', message: '标签为必填参数' }
            ]
        });

        const classifyOptions = Object.entries(commons.CLASSIFY_LIST).map(([value, label]) => <Option key={value} value={value}>{label}</Option>);

        const labelOptions = labelList.map(({ _id, name }) => <Option key={_id} value={_id}>{name}</Option>);

        return (
            <div className="content-edit-wrapper">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/content">内容管理</Link></BreadcrumbItem>
                    <BreadcrumbItem>编辑</BreadcrumbItem>
                </Breadcrumb>
                <div>
                    <Form layout="horizontal">
                        <FormItem label="文章标题">
                            {titleDecorator(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem label="文章分类">
                            {classifyDecorator(
                                <Select>
                                    {classifyOptions}
                                </Select>
                            )}
                        </FormItem>

                        <FormItem label="标签">
                            {labelDecorator(
                                <Select>
                                    {labelOptions}
                                </Select>
                            )}
                        </FormItem>
                    </Form>
                </div>
                {
                    info.content || !id ? <Editor
                        id="edit"
                        style={editorStyle}
                        ref="edit"
                        content={info.content}
                    /> :
                    null
                }
                <Button onClick={this.handleSubmint}>保存</Button>
            </div>
        );
    }
}

const mapStateToProps = ({ contentEdit }, { location: { query } }) => {
    const { info, labelList } = contentEdit;
    const { id } = query;

    return {
        id,
        info,
        labelList,
    };
};

const mapDispatchToProps = { ...actions, goBack };

ContentEdit.propTypes = {
    id: PropTypes.string,
    info: PropTypes.object.isRequired,
    fetchSubmit: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(ContentEdit));
