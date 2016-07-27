import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Mui} from '../data/mui';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from '../../css/style.css';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import Header from '../component/Header';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.check()
  }

  check() {
    console.log(this.props.params.postId)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="ブログ記事" leftIcon={true} />
        </main>
      </MuiThemeProvider>
    )
  }
}
