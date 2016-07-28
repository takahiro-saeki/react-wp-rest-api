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
import inlineStyle from '../data/inlineStyle';


export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: {
        title: {
          rendered: null
        },
        date: null,
        content: {
          rendered: null
        },
        featured_media: null
      },
      imgPath: null,
      loader: false
    }
    this.async = this.async.bind(this);
    this.onFulfilled = this.onFulfilled.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
    this.load()
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

  componentWillMount() {
    this.setState({loader: true})
  }

  imageLoad() {
    request
    .get(`${url.media}/${this.state.body.featured_media}`)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        this.setState({
          imgPath: res.body.source_url,
          loader: false
        })
      }
    })
  }


  load() {
    this.async().then(this.onFulfilled, this.onRejected).then(() => this.imageLoad())
  }

  onFulfilled(res) {
    console.log(res)
    this.setState({
      body: res.body
    })
  }

  onRejected(err) {
    console.log(err)
  }

  render() {
    const testLoader = () => {
      if (this.state.loader === true) {
        return <CircularProgress style={inlineStyle.loader}/>
        }
      }
    return (
      <MuiThemeProvider muiTheme={Mui}>
        <div>
          <div className={this.state.loader? styles.loaderBg: ''}></div>
          {testLoader()}
        <main>
          <Header page="ブログ記事" leftIcon={true} />
          <Card>
            <CardTitle
              title={this.state.body.title.rendered}
              subtitle={moment(this.state.body.date).format('YYYY/MM/DD')}
            />
          <CardMedia><img src={this.state.imgPath} /></CardMedia>
            <CardText
              style={{color: "#757575"}}
              dangerouslySetInnerHTML={{__html: this.state.body.content.rendered}}
            />
          </Card>
        </main>
      </div>
      </MuiThemeProvider>
    )
  }
}
