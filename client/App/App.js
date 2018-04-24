import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

import Header from 'Containers/Header';
import Footer from 'Components/Footer';
import NaveSide from 'Components/NaveSide';
import appLayout from 'SharedStyles/appLayout.css';
import styles from './styles.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { getUser } from '../Views/SignIn/actions';
injectTapEventPlugin();
class AppContainer extends Component {
  componentDidMount() {
    const {
      getUser,
    } = this.props;
    getUser();
  }

  render() {
      return (
        <div>
          <Helmet><title>小康电子商城</title></Helmet> 
          <Header />
          <NaveSide />
            {this.props.children}
          <Footer />
        </div>
      );
  }
  }

  export default connect(
    (state) => { return {
      
    }; },
    (dispatch) => { return {
      getUser: () => { dispatch(getUser()); },
    }; }
  )(AppContainer);

