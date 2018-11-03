import React, { Component } from 'react';
import { StatusTypes } from '../Status/StatusTypes';

export class ProjectData extends Component {
    displayName = ProjectData.name

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            loading: true
        };

        this.renderProjectsTable = this.renderProjectsTable.bind(this);

        fetch('api/SampleData/WeatherForecasts')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    projects: data, loading: false });
            });
    }


    renderProjectsTable(projects) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project =>
                        <tr key={project.dateFormatted}>
                            <td>{project.dateFormatted}</td>
                            <td>{project.temperatureC}</td>
                            <td>{project.temperatureF}</td>
                            <td>{project.summary} {StatusTypes.getStatusLabel(1)} </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderProjectsTable(this.state.projects);

        return (
            <div>
                <h1>Weather project</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }
}
