import React, { Component } from 'react';

class StatusTypes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    async componentWillMount() {
        await fetch("api/Status")
            .then((response) => response.json())
            .then((data) => this.setState({ data }));
        console.log("DATA");
        console.log(this.state.data);

    }
}

export default StatusTypes;