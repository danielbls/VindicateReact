import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Counter } from './components/Counter';
import ProjectList from './components/Project/ProjectList';
import ProjectDetails from './components/Project/ProjectDetails';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={ProjectList} />
        <Route path='/counter' component={Counter} />
        <Route path='/projects' component={ProjectList} />
        <Route path='/project/:projectGuid' component={ProjectDetails} />
      </Layout>
    );
  }
}
