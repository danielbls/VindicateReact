import React from 'react';
import { Card, Modal, Button, DatePicker, Select, Table, Icon, Form, Input } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment'
import { withRouter } from 'react-router-dom'
// this also works with react-router-native

const BackButton = withRouter(({ history }) => (
    <Button
        type='default'
        onClick={() => { history.push('../projects') }}
    >
        Back
  </Button>
))

const scroll = { y: 240 };
const pagination = { position: 'bottom' };
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;
let projectGuid = "";

const tabList = [{
    key: 'project',
    tab: 'Project',
    },
    {
    key: 'milestones',
    tab: 'Milestones',
}];

const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>,
};



class ProjectMilestones extends React.Component {
    state = {

    }

    componentDidUpdate() {
        console.log(this.props);
    }

    render() {
        const props = this.props;

        let GetStatusLabel = (statusId) => {
            if (this.props.statusTypes.length > 0) {
                return this.props.statusTypes.filter(function (item) {
                    return item.id === statusId.statusId;
                })[0].name;
            }
            else {
                return "Loading...";
            }
        }

        let GetPriorityLabel = (priorityId) => {
            if (this.props.priorityTypes.length > 0) {
                return this.props.priorityTypes.filter(function (item) {
                    return item.id === priorityId.priorityId;
                })[0].name;
            }
            else {
                return "Loading...";
            }
        }
        
        let columns = [
            {
                title: 'Milestone',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                render: text => <span>{text}</span>,
                sorter: (a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                }
            },
            {
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
            }
        ]

        return (
            <div>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{float: "left"}}>
                        <Button type="default" style={{ marginRight: "10px" }}><Icon type="plus" />Add</Button>
                        <Button type="danger" hidden="true" style={{ marginRight: "10px" }}><Icon type="minus" />Remove</Button>
                    </div>
                    <div style={{ float: "right" }}>
                        <Input prefix={<Icon type="search"/>} type="text" placeholder="Search"/>
                    </div>
                    <div className="clearfix"></div>
                </div>
                <Table {...this.props} bordered columns={columns} dataSource={props.hasData ? this.props.project.milestones : null} loading={this.props.loading} rowKey="guid" />
            </div>
        );
    }
}

class ProjectInfo extends React.Component {
    state = {
        key: "milestones"
    }

    onTabChange = (key) => {
        this.setState({ key: key });
    }

    render() {
        const key = this.state.key;
        return (
            <Card
                style={{ width: '100%' }}
                title={<h4><Icon type="pushpin" /> {this.props.project.name} </h4>}
                extra={<BackButton />}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={(key) => { this.onTabChange(key, 'key'); }}
            >
                { key === "milestones" && <ProjectMilestones { ...this.props } />}
            </Card>
        );
    }
}

export default class ProjectDetails extends React.Component {
    state = {
        bordered: false,
        loading: true,
        pagination,
        size: 'default',
        rowSelection: {},
        scroll: undefined,
        hasData: false,
        project: [],
        statusTypes: [],
        priorityTypes: []
    }

    componentWillMount() {
        projectGuid = this.props.match.params.projectGuid;

        fetch('api/Projects/' + projectGuid)
            .then((response) => response.json())
            .then((data) => this.setState({
                project: data,
                hasData: true,
                loading: false
            }));

        fetch("api/Status").then((response) => response.json()).then((d) => this.setState({ statusTypes: d }));
        fetch("api/Priorities").then((response) => response.json()).then((d) => this.setState({ priorityTypes: d }));

    }

    render() {
        return (
                <div style={{ paddingTop: "10px" }}>
                    <ProjectInfo {...this.state} />
                </div>
        );
    }
}