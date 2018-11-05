import React from 'react';
import { Modal, Button, DatePicker, Select, Table, Icon, Form, Input } from 'antd';
import "antd/dist/antd.css";
import moment from 'moment'

const scroll = { y: 240 };
const pagination = { position: 'bottom' };
const FormItem = Form.Item;
const Option = Select.Option;
const createForm = Form.create;

export default class NewProjectModal extends React.Component {

    newProject = [];

    handleOk = (e) => {

        fetch('api/Projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": this.newProject.name,
                "dueDate": this.newProject.dueDate,
                "statusId": this.newProject.statusId,
                "priorityId": this.newProject.priorityId
            })
        }).then((response) => { if (response.status === 201) { this.props.props.fetchProjects(); } });

        this.props.props.hideModal();
        this.setState({ newProject: [] });
        ++this.childKey;
    }

    handleCancel = (e) => {
        ++this.childKey;
        this.props.props.hideModal();
    }

    handleDateChange = (date, dateString) => {
        this.newProject.dueDate = moment.utc(date).startOf('day').toISOString();
    }

    render() {
        let props = this.props.props.state;
        return (
            <Modal
                title="New Project"
                visible={props.newProjectModal}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Form form={props.form} key={this.childKey} layout="horizontal" onSubmit={this.handleSubmit} style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                    <FormItem>
                        <Input size="large" suffix={<Icon type="project" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Project Name" onChange={(input) => this.newProject.name = input.target.value} />
                    </FormItem>
                    <FormItem>
                        <DatePicker ref={(input) => this.newProject.dueDate = input} style={{ width: "100%" }} size="large" onChange={this.handleDateChange} placeholder="Due Date" format="MM/DD/YYYY" suffixIcon={<Icon type="clock-circle" />} />
                    </FormItem>
                    <FormItem>
                        <Select
                            ref={(input) => this.newProject.statusId = input}
                            size="large"
                            suffixIcon={<Icon type="question-circle" />}
                            showSearch
                            placeholder="Status"
                            optionFilterProp="children"
                            onChange={(e) => this.newProject.statusId = e}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {props.statusTypes.map(item => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>;
                            })
                            }
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Select
                            ref={(input) => this.newProject.priorityId = input}
                            size="large"
                            suffixIcon={<Icon type="exclamation-circle" />}
                            showSearch
                            placeholder="Priority"
                            optionFilterProp="children"
                            onChange={(e) => this.newProject.priorityId = e}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {props.priorityTypes.map(item => {
                                return <Option value={item.id} key={item.id}>{item.name}</Option>;
                            })
                            }
                        </Select>
                    </FormItem>
                </Form>
            </Modal>

        );
    }
}
