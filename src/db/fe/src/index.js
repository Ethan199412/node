

import React, { Component, PureComponent } from "react";
import ReactDOM from "react-dom";
import './style/index.less'
import axios from 'axios'
import { Table, Card, Button, Form, Input, Select } from 'antd'
import 'antd/dist/antd.min.css';
import { EditableRow, EditableCell } from './editable-component/editable-component.js'

const { Option } = Select
const columns = [
    {
        title: 'ID',
        dataIndex: '_id',
        key: '_id'
    },
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        editable: true
    },
    {
        title: '性别',
        dataIndex: 'gender',
        key: 'gender',
        editable: true,
        render: (gender) => {
            return gender === 1 ? '女' : '男'
        }
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        editable: true
    }
]


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { students: [] }
        this.a = 0
        columns.push({
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            render: (_, row) => {
                return (
                    <>
                        <Button
                            type='primary'
                            onClick={() => { this.onDelete(row) }}>
                            删除
                        </Button>
                        <Button onClick={() => { this.onUpdate(row) }}>更新</Button>
                    </>
                )
            }
        })
        this.columns = columns
    }

    componentDidMount() {
        this.getRead()
    }

    onUpdate = (row) => {
        console.log('update row', row)
        const { name, age, gender, _id } = row

        axios.post('/update', { name, age, gender, _id}).then(res => {
            console.log('update res', res)
            this.getRead()
        })
    }

    onDelete = (row) => {
        console.log('[p2] row', row)
        axios.post('/delete', row._id).then(res => {
            console.log('delete res', res)
            this.getRead()
        })
    }

    getRead = () => {
        axios.get('/read').then(res => {
            console.log('[p0],res', res.data)
            let students = res.data.map((e, index) => {
                console.log(index)
                return {
                    ...e,
                    key: e.id
                }
            })
            this.setState({
                students
            })
        }).catch(err => {
            console.log('err1', err)
        })
    }

    onFinish = (value) => {
        axios.post('/insert', value).then(res => {
            this.getRead()
        })
    }

    handleSave = (row) => {
        const students = JSON.parse(JSON.stringify(this.state.students))
        console.log('[p3] row', row, students)
        const index = students.findIndex(e => {
            return e._id === row._id
        })
        students[index] = row
        this.setState({
            students
        })
    }

    render() {
        console.log('[p1]', this.state.students, this.columns)
        const components = {
            body: {
                row: EditableRow,
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }

            return {
                ...col,
                onCell: (record) => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });

        return (<div className='container'>
            <div>{this.state.num}</div>
            <div className='container'>
                <Table
                    components={components}
                    dataSource={this.state.students}
                    columns={columns}
                />

                <Form
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label='姓名'
                        name='name'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='年龄'
                        name='age'
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='性别'
                        name='gender'
                    >
                        <Select>
                            <Option value={0}>男</Option>
                            <Option value={1}>女</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>插入</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>);
    }
}

ReactDOM.render(<App />, document.getElementById("root"));

