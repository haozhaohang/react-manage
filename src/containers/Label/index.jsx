import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Table, Form, Input, message } from 'antd';
import * as actions from 'Actions/label';
import * as router from 'Actions/router';
import { equalByProps } from 'Assets/js/util';

// css
import './index.styl';

const { Item: FormItem } = Form;

class Label extends Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '标签名',
                dataIndex: 'name',
            },
            {
                title: '操作',
                render: ({ _id }) =>
                (
                    <div>
                        <Link to={`/label/edit?id=${_id}`}>
                            <Button
                                type="primary"
                            >
                                编辑
                            </Button>
                        </Link>
                        <Button
                            type="danger"
                            onClick={() => this.handleDel(_id)}
                        >
                            删除
                        </Button>
                    </div>
                ),
            },
        ];

        this.handleChange = this.handleChange.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { pageIndex, name, pageSize, fetchList } = this.props;
        const params = {
            pageIndex,
            name,
            pageSize,
        };

        fetchList(params);
    }

    componentDidUpdate(preProps) {
        const { pageIndex, name, pageSize, fetchList } = this.props;

        if (equalByProps(preProps, this.props, ['pageIndex', 'name'] )) {
            fetchList({ pageIndex, name, pageSize });
        }
    }

    handleChange(val) {
        const { updateQuery } = this.props;
        const { current: pageIndex } = val;

        updateQuery({ pageIndex });
    }

    async handleDel(id) {
        const { pageIndex, name, fetchList, fetchLabelDel } = this.props;

        try {
            await fetchLabelDel({ id });
        } catch (e) {
            return;
        }
        message.success('删除成功');

        fetchList({ pageIndex, name });
    }

    // 搜索
    handleSubmit(e) {

        e.preventDefault();
        const { replaceQuery, form: { validateFields } } = this.props;

        validateFields((error, values) => {
            if (error) {
                return;
            }

            replaceQuery({ ...values });
        })
    }

    render() {
        const { list, loading, total, pageIndex, name, form: { getFieldDecorator } } = this.props;
        const pagination = {
            total,
            current: pageIndex,
        };

        const nameDecorator = getFieldDecorator('name', {
            initialValue: name,
        });

        return (
            <div className="user-wrapper">
                <div className="filter-containers">
                    <div>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <FormItem label="标签名">
                                {nameDecorator(<Input />)}
                            </FormItem>

                            <FormItem>
                                <Button type="primary" htmlType="submit" icon="search">搜索</Button>
                            </FormItem>
                        </Form>
                    </div>
                    <div>
                        <Link to="/label/edit">
                            <Button type="primary" icon="plus">
                                添加标签
                            </Button>
                        </Link>
                    </div>
                </div>
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        loading={loading}
                        rowKey="_id"
                        pagination={pagination}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ labelList }, { location }) => {
    const { list, total, loading, pageSize } = labelList;
    const { pageIndex = 1, name } = location.query;

    return {
        list,
        total,
        loading,
        pageSize,
        name,
        pageIndex: Number(pageIndex),
    };
};

const mapDispatchToProps = { ...actions, ...router };

Label.propTypes = {
    list: PropTypes.array.isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    pageIndex: PropTypes.number.isRequired,
    name: PropTypes.string,
    fetchList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Label));
