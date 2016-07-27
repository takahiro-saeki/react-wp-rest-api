import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {Mui} from '../data/mui';
import request from 'superagent';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import style from '../../css/style.css';

const url = {
  req: 'http://mohu-para.com/wp-json/wp/v2/posts',
  check: 'http://mohu-para.com/wp-json/wp/v2/media'
}

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: [
        {
          title: {
            rendered: ''
          },
          _links: {
            wp: {
              featuredmedia: [
                {
                  href: ''
                }
              ]
            }
          }
        }
      ]
    }
    this.receive = this.receive.bind(this);
    this.check = this.check.bind(this);
  }

  check() {
    request
    .get(url.check)
    .end((err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
      }
    });
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
          body: res.body
        })
      }
    });
  }

  render() {
    const title = this.state.body.map((body, i) => {
      return (
        <Card>
          <CardHeader
            title="URL Avatar"
            subtitle="Subtitle"
            avatar={body._links.wp.featuredmedia[i].href}
            />
          <CardMedia
            overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
            >
            <img src="http://lorempixel.com/600/337/nature/" />
          </CardMedia>
          <CardTitle title={body.title.rendered} subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      )
    })

    return (
      <MuiThemeProvider muiTheme={Mui}>
        <main>
          <AppBar
            title="Title"
            iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
          <p className={style.test}
            onClick={this.receive}>サンプル</p>
          <p className={style.hoge}
            onClick={this.check}>state check</p>
          <div>{this.state.body ? title : ''}</div>
        </main>
      </MuiThemeProvider>
    )
  }
}
