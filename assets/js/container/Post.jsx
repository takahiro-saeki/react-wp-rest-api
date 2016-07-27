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
import url from '../data/url';
const testURL = 'http://mohu-para.com/wp-json/wp/v2/posts/1542';

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.check()
    this.async = this.async.bind(this);
    this.async()
  }

  check() {
    console.log(this.props.params.postId)
  }

  async() {
    request
    .get(`${url.req}/${this.props.params.postId}`)
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
          <Header page="ブログ記事" leftIcon={true} />
        </main>
      </MuiThemeProvider>
    )
  }
}
