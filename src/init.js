import {
  branch,
  renderNothing,
  compose,
  renderComponent,
  lifecycle,
} from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import withRecorder from 'big-brother/src/react-native';

import Router from './router';
import I18n from './i18n';
import { incrementAppStartsCount } from './store/actions';

const withReduxConnect = connect(
  state => ({
    isAppReady: state.init.ready,
    locale: state.settings.currentLocale,
  }),
  dispatch => bindActionCreators({ incrementAppStartsCount }, dispatch),
);

export default compose(
  withRecorder,
  withReduxConnect,
  branch(props => !props.isAppReady, renderComponent(renderNothing())),
  lifecycle({
    componentWillMount() {
      I18n.locale = this.props.locale;
      this.props.incrementAppStartsCount();
    },
  }),
)(Router);
