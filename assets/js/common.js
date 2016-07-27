import React, {Component} from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';
import {render} from 'react-dom';
import Main from './container/Main';
import Post from './container/Post';
import NotFound from './container/NotFound';
import styles from '../css/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <Router history={browserHistory}>
    <Route path='/' component={Main} />
    <Route path='/:postId' component={Post} />
    <Route path='*' component={NotFound} />
  </Router>,
  document.getElementById('app')
)
