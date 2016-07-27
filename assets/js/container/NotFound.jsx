import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Mui} from '../data/mui';
import Header from '../component/Header';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="Not Found" leftIcon={false} />
        </main>
      </MuiThemeProvider>
    )
  }
}
