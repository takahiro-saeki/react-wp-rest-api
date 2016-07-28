import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Mui} from '../data/mui';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../css/style.css';
import moment from 'moment';
import CircularProgress from 'material-ui/CircularProgress';
import Header from '../component/Header';
import url from '../data/url';

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
    this.check = this.check.bind(this);
    this.loader = this.loader.bind(this);
  }

  location(url) {
    browserHistory.push(url)
  }

  check() {
    request
    .get(url.media)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
      }
    });
  }

  componentDidMount() {
    document.body.classList.add(styles.loaderBg);
    this.state.loader ? '' : this.loader();
    this.receive();
  }

  loader() {
    this.setState({
      loader: true
    })
  }

  receive() {
    request
    .get(url.req)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        this.setState({
          body: res.body,
          loader: false
        })
      }
    });
  }

  render() {
    const title = this.state.body.map((body, i) => {
      return (
        <Card style={{width: '90%', margin: '1rem auto'}}>
          <CardTitle
            title={body.title.rendered}
            titleStyle={{fontSize: '1.2rem', lineHeight: 'auto'}}
            subtitle={moment(body.date).format('YYYY/MM/DD')} />
          <CardText
            dangerouslySetInnerHTML={{__html: body.excerpt.rendered.replace('[&hellip;]', '…')}}
            style={{padding: '0 1rem'}} />
          <CardActions>
            <RaisedButton
              label="続きを見る"
              secondary={true}
              fullWidth={true}
              onClick={() => this.location('/' + body.id)}
              style={{margin: ".5rem auto"}}
            />
          </CardActions>
        </Card>
      )
    })

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <Header page="もふ☆パラブログ" leftIcon={false} />
          <div>{this.state.body ? title : ''}</div>
          {this.state.loader ? <CircularProgress /> : ''}
        </main>
      </MuiThemeProvider>
    )
  }
}
