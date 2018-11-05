import React from 'react';
import { Redirect, Route } from 'react-router';
import { Modal, Button, DatePicker, Select, Table, Icon, Form, Input } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment'
import NewProjectModal from './NewProjectModal';
import { withRouter } from 'react-router-dom'
// this also works with react-router-native

const scroll = { y: 240 };
const pagination = { position: 'bottom' };
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

class ProjectTable extends React.Component {
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
        newProjectModal: false,
        selectedRowKeys: []
    }

    modal = []

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

    hideModal = () => {
        this.setState({ newProjectModal: false });
    }

    confirmDelete = () => {
        if (window.confirm("Really delete these projects?")) {

            function search(nameKey, myArray) {
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].name === nameKey) {
                        return myArray[i];
                    }
                }
            }

            function deleteProjects() {
                let newData = this.state.data;

                for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
                    this.deleteProject(this.state.selectedRowKeys[i]);
                    let index = newData.filter((_, x) => x.guid === this.state.selectedRowKeys[i]).index;
                    newData = newData.splice(index, 1);
                }

                this.setState({ data: newData });
            }

            deleteProjects = deleteProjects.bind(this);
            deleteProjects();


        }
    }

    deleteProject = async (guid) => {
        return await fetch('api/Projects/' + guid, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => response);
    }

    fetchProjects = () => {
        fetch("api/Projects").then((response) => response.json()).then((d) => this.setState({ data: d, selectedRowKeys: [] }));
    }

    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    }

    viewProject = (props, record) => {
        console.log(record);
        props.history.push('../project/' + record.guid);
    }

    render() {
        const props = this.props;
        let state = this.state;
        
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
            sorter: (a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            },
        }, {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 140,
                render: text => <span style={{ color: new Date(text) < new Date() ? "#990000" : "unset" }}>{new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }).format(new Date(text))}</span>,
            sorter: (a, b) => a.dueDate > b.dueDate
        }, {
            title: 'Status',
            dataIndex: 'statusId',
            key: 'statusId',
            width: 140,
            render: text => <span><GetStatusLabel statusId={text} /></span>,
            sorter: (a, b) => a.statusId > b.statusId
        }, {
            title: 'Priority',
            dataIndex: 'priorityId',
            key: 'priorityId',
            width: 140,
            render: text => <span><GetPriorityLabel priorityId={text} /></span>,
            sorter: (a, b) => a.priorityId > b.priorityId
        }];

        const { selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };

        return (
            <div style={{ paddingTop: "10px" }}>
                <NewProjectModal props={this} />
                <div style={{ float: 'left' }}>
                    <h4>Projects</h4>
                </div>
                <div style={{ float: 'right' }}>
                    <Button style={{ marginRight: "10px" }} type="danger" hidden={this.state.selectedRowKeys.length < 1} onClick={this.confirmDelete}><Icon type="delete" />Delete</Button>
                    <Button type="default" onClick={this.showModal}><Icon type="plus" />Project</Button>
                </div>
                <div className="clearfix"></div>
                <div style={{ paddingTop: "10px" }}>
                    <Table {...this.state} rowSelection={rowSelection}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    props.history.push("../project/" + record.guid);
                                }
                            }
                        }
                    } bordered columns={columns} dataSource={state.hasData ? this.state.data : null} loading={this.state.loading} rowKey="guid" />
                </div>
            </div>
        );
    }
}

class ProjectList extends React.Component {
    ProjectTable = createForm()(ProjectTable);
    render() {
        return (
            <div>
                <ProjectTable {...this.props} />
            </div>
        );
    }
}

export default withRouter(ProjectList)