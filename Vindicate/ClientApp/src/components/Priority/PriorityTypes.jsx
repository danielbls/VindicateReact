import React, { Component } from 'react';

class PriorityTypes extends Component {

    priorityTypes = [];

    getPriorityTypes = () => {
        return fetch("api/Priorities").then((response) => response.json()).then((data) => this.priorityTypes = data);
    }

    getPriorityLabel = (priorityId) => {
        return this.priorityTypes.filter(function (item) {
            return item.id === priorityId
        })[0].name;
    }
}

export default PriorityTypes;