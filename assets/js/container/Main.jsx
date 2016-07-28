import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import uuid from 'node-uuid';
import request from 'superagent';
import moment from 'moment';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import {Mui} from '../data/mui';
import styles from '../../css/style.css';
import Header from '../component/Header';
import url from '../data/url';
import inlineStyle from '../data/inlineStyle';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      body: [
        {
          title: {
            rendered: ''
          },
          date: '',
          excerpt: {
            rendered: ''
          }
        }
      ]
    }
    this.receive = this.receive.bind(this);
    this.loader = this.loader.bind(this);
    this.windowResize = this.windowResize.bind(this);
  }

  location(url) {
    browserHistory.push(url)
  }

  componentDidMount() {
    this.state.loader ? '' : this.loader();
    this.receive();
  }

  window() {
    window.addEventListener('resize', this.windowResize);
    if(window.innerWidth < 768) {
      return {
        width: '90%',
        margin: '1rem auto'
      }
    } else {
      return {
        width: '21%',
        margin: '1rem 2%'
      }
    }
  }

  windowResize() {
    this.setState({window: window.innerWidth});
  }

  loader() {
    this.setState({loader: true})
  }

  receive() {
    request
    .get(url.req)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        this.setState({
          body: res.body,
          loader: false
        })
      }
    });
  }

  render() {
    const title = this.state.body.map((body) => {
      return (
        <Card style={this.window()} key={uuid.v4()}>
          <CardTitle
            title={body.title.rendered}
            titleStyle={styles.listTitle}
            subtitle={moment(body.date).format('YYYY/MM/DD')} />
          <CardText
            dangerouslySetInnerHTML={{__html: body.excerpt.rendered.replace('[&hellip;]', '…')}}
            style={styles.listText} />
          <CardActions>
            <RaisedButton
              label="続きを見る"
              secondary={true}
              fullWidth={true}
              onClick={() => this.location('/' + body.id)}
              style={styles.raiseBtn}
              />
          </CardActions>
        </Card>
      )
    })

    const Loader = () => {
      if (this.state.loader === true) {
        return <CircularProgress style={inlineStyle.loader}/>
      }
    }

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <div>
          <div className={this.state.loader ? styles.loaderBg: ''}></div>
          {Loader()}
          <main>
            <Header page="もふ☆パラブログ" leftIcon={false} />
            <div className={styles.contentWrap}>{this.state.body ? title : ''}</div>
          </main>
        </div>
      </MuiThemeProvider>
    )
  }
}
