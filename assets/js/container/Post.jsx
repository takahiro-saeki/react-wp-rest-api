import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import request from 'superagent';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import {Mui} from '../data/mui';
import styles from '../../css/style.css';
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
      loader: false,
      window: null
    }
    this.async = this.async.bind(this);
    this.onFulfilled = this.onFulfilled.bind(this);
    this.imageLoad = this.imageLoad.bind(this);
    this.windowSize = this.windowSize.bind(this);
    this.load()
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

  windowSize() {
    this.setState({window: window.innerWidth});
  }

  deviceJudge() {
    window.addEventListener('resize', this.windowSize);
    if(window.innerWidth < 768) {
      return {
        margin: '0 auto'
      }
    } else {
      return {
        margin: '2rem auto',
        maxWidth: '1024px'
      };
    }
  }

  onFulfilled(res) {
    this.setState({
      body: res.body
    })
  }

  onRejected(err) {
    console.log(err)
  }

  render() {
    const Loader = () => {
      if (this.state.loader === true) {
        return <CircularProgress style={inlineStyle.loader}/>
      }
    }

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <div>
          <div className={this.state.loader? styles.loaderBg: ''}></div>
          {Loader()}
          <main>
            <Header page="ブログ記事" leftIcon={true} />
            <Card style={this.deviceJudge()}>
              <CardTitle
                title={this.state.body.title.rendered}
                subtitle={moment(this.state.body.date).format('YYYY/MM/DD')}
                />
              <CardMedia><img src={this.state.imgPath} /></CardMedia>
              <CardText
                style={styles.postText}
                dangerouslySetInnerHTML={{__html: this.state.body.content.rendered}}
                />
            </Card>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}
