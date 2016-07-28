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
    this.onFulfilled = this.onFulfilled.bind(this);
    this.async()
  }

  check() {
    console.log(this.props.params.postId)
  }

  async() {
    return new Promise((resolve, reject) => {
      request
      .get(`${url.req}/${this.props.params.postId}`)
      .end((err, res) => {
        if(err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  load() {
    this.async().then(this.onFulfilled, this.onRejected)
  }

  onFulfilled(data) {
    console.log(data)
    this.setState({
      body: data.body
    })
  }

  onRejected(err) {
    console.log(err)
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="ブログ記事" leftIcon={true} />
          <Card>
            <CardTitle title="Card title" subtitle="Card subtitle" />
              <CardMedia overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}>
                <img src="http://lorempixel.com/600/337/nature/" />
              </CardMedia>
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </main>
      </MuiThemeProvider>
    )
  }
}
