import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;
    constructor({ appController }) {
        super();
        this.appController = appController;
    }
  render() {
    return (
      <div>
            <NavMenu appController={this.appController} />
        <Container>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
