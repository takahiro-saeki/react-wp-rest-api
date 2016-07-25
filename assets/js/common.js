import React, {Component} from 'react';
import {render} from 'react-dom';

class Test extends Component {
  render() {
    return (
      <main>テスト</main>
    )
  }
}

render(
  <Test />,
  document.getElementById('app')
)
