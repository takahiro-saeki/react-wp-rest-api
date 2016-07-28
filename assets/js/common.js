import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import {render} from 'react-dom';
import Main from './container/Main';
import Post from './container/Post';
import styles from '../css/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
    <Route path='/:postId' component={Post} />
  </Router>,
  document.getElementById('app')
)
