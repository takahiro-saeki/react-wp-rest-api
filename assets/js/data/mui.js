import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const Mui = getMuiTheme({
  palette: {
    textColor: cyan500,
  },
  appBar: {
    height: 50
  }
});
