import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Back from 'material-ui/svg-icons/navigation/arrow-back';

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  location() {
    browserHistory.push('/');
  }

  render() {
    return (
      <AppBar
        title={this.props.page}
        titleStyle={{textAlign: "center"}}
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        iconElementLeft={
          this.props.leftIcon ? <IconButton onClick={this.location}><Back /></IconButton> : <IconButton />
        }
      />
    )
  }
}
