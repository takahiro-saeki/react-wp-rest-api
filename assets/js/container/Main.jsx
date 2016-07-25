import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Mui} from '../data/mui';
import request from 'superagent';


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ''
    }
    this.receive = this.receive.bind(this);
    this.check = this.check.bind(this);
  }

  check() {
    console.log(this.state.body)
  }

  receive() {
    request
    .get('http://mohu-para.com/wp-json/wp/v2/posts')
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        this.setState({
          body: res.body
        })
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          <p style={{
              background: '#CCC',
              padding: '1rem'
            }}
            onClick={this.receive}>サンプル</p>
          <p style={{
              background: '#f7f7f7',
              padding: '1rem'
            }}
            onClick={this.check}>state check</p>
        </main>
      </MuiThemeProvider>
    )
  }
}
