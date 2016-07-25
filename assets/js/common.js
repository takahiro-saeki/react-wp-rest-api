import React, {Component} from 'react';
import {render} from 'react-dom';
import Main from './container/Main';
import STYLE from '../css/style.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

render(
  <Main />,
  document.getElementById('app')
)
