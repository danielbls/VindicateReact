import React from 'react';
import { Modal, Button, DatePicker, Select, Table, Icon, Form, Input } from 'antd';
import "antd/dist/antd.css";

const scroll = { y: 240 };
const pagination = { position: 'bottom' };
const FormItem = Form.Item;
const Option = Select.Option;

export default class ProjectList extends React.Component {
    state = {
        bordered: false,
        loading: true,
        pagination,
        size: 'default',
        rowSelection: {},
        scroll: undefined,
        hasData: false,
        data: [],
        statusTypes: [],
        priorityTypes: [],
        newProjectModal: false
    }

    componentWillMount() {
        fetch("api/Projects").then((response) => response.json()).then((d) => this.setState({ data: d }));
        fetch("api/Status").then((response) => response.json()).then((d) => this.setState({ statusTypes: d }));
        fetch("api/Priorities").then((response) => response.json()).then((d) => this.setState({ priorityTypes: d }));
    } 

    componentDidMount() {
        this.setState({ loading: false, hasData: true });
    }
    
    handleToggle = (prop) => {
        return (enable) => {
            this.setState({ [prop]: enable });
        };
    }

    handleRowSelectionChange = (enable) => {
        this.setState({ rowSelection: enable ? {} : undefined });
    }

    handleScollChange = (enable) => {
        this.setState({ scroll: enable ? scroll : undefined });
    }

    handleDataChange = (hasData) => {
        this.setState({ hasData });
    }

    handlePaginationChange = (e) => {
        const { value } = e.target;
        this.setState({
            pagination: value === 'none' ? false : { position: value },
        });
    }

    showModal = () => {
        this.setState({
            newProjectModal: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            newProjectModal: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            newProjectModal: false,
        });
    }

    handleDateChange = (date, dateString) => {
        console.log(date, dateString);
    }


    render() {
        const state = this.state;

        let GetStatusLabel = (statusId) => {
            if (state.statusTypes.length > 0) {
                return state.statusTypes.filter(function (item) {
                    return item.id === statusId.statusId;
                })[0].name;
            }
            else {
                return "Loading...";
            }
        }

        let GetPriorityLabel = (priorityId) => {
            if (state.priorityTypes.length > 0) {
                return state.priorityTypes.filter(function (item) {
                    return item.id === priorityId.priorityId;
                })[0].name;
            }
            else {
                return "Loading...";
            }
        }

        let columns = [{
            title: 'Project',
            dataIndex: 'name',
            key: 'name',
            width: 200,
            render: text => <span>{text}</span>,
        }, {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 140,
            render: text => <span>{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }).format(new Date(text))}</span>,
        }, {
            title: 'Status',
            dataIndex: 'statusId',
            key: 'statusId',
            width: 140,
                render: text => <span><GetStatusLabel statusId={text}/></span>
        }, {
                title: 'Priority',
                dataIndex: 'priorityId',
            key: 'priorityId',
            width: 140,
                render: text => <span><GetPriorityLabel priorityId={text} /></span>
            }];

        return (
            <div style={{ paddingTop: "10px" }}>
                <Modal
                    title="New Project"
                    visible={this.state.newProjectModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                        <FormItem>
                            <Input size="large" prefix={<Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Project Name" />
                        </FormItem>
                        <FormItem>
                            <DatePicker style={{width: "100%"}} size="large" onChange={this.handleDateChange} placeholder="Due Date" format="MM/DD/YYYY" />
                        </FormItem>
                        <FormItem>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Status"
                                optionFilterProp="children"
                                onChange={(e) => console.log(e)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {state.statusTypes.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>;
                                })
                                }
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Priority"
                                optionFilterProp="children"
                                onChange={(e) => console.log(e)}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {state.priorityTypes.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>;
                                })
                                }
                            </Select>                        </FormItem>
                    </Form>
                </Modal>
                <div style={{ float: 'left' }}>
                    <h4>Projects</h4>
                </div>
                <div style={{ float: 'right' }}>
                    <Button type="default" onClick={this.showModal}><Icon type="plus"/>Project</Button>
                </div>
                <div className="clearfix"></div>
                <div style={{ paddingTop: "10px" }}>
                    <Table {...this.state} bordered columns={columns} dataSource={state.hasData ? this.state.data : null} loading={this.state.loading} rowKey="guid" />
                </div>
            </div>
        );
    }
}
