import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;
  constructor (appController ) {
    this.appController = appController;
  }
  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? 
            <AuthorizeRoute {...rest} element={element} appController={this.appController}/> : element} appController={this.appController} />;
          })}
        </Routes>
      </Layout>
    );
  }
}
