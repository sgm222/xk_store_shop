import {connect} from 'react-redux';
import React, {Component} from 'react';
import { Link } from 'react-router';
import * as styles from './styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Tabs, Tab} from 'material-ui/Tabs';
import Avatar from 'material-ui/Avatar';
class Owner extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    const {
      getAddress
    } = this.props;
  }

  render() {
    const { user } = this.props;
      return(
        <div style={{
          width:'800px',
          margin:'30px auto'
        }}>
          {user.fetchingUser && 
            <div style={{marginBottom:'30px'}}> 
              <MuiThemeProvider>
                <Avatar style={{width:'80px',height:'80px'}} src={"/build/uploadFiles/" + user.fileName} />
              </MuiThemeProvider>
              <span>{user.name}</span>
              <Link to='/myAddress'>我的收货地址</Link>
              <Link to='/myOrders'>我的订单</Link>
            </div>
          }
            <MuiThemeProvider>
            <Tabs>
              <Tab label="待发货" style={{backgroundColor: '#6fce53'}}>
                <div>
                  <h2 className={styles.headline}>Tab One</h2>
                  <p>
                    This is an example tab.
                  </p>
                  <p>
                    You can put any sort of HTML or react component in here. It even keeps the component state!
                  </p>
                </div>
              </Tab>
              <Tab label="待收货" style={{backgroundColor: '#6fce53'}}>
                <div>
                  <h2 className={styles.headline}>Tab Two</h2>
                  <p>
                    This is another example tab.
                  </p>
                </div>
              </Tab>
              <Tab  label="待评价" style={{backgroundColor: '#6fce53'}}>
                <div>
                  <h2 className={styles.headline}>Tab Three</h2>
                  <p>
                    This is a third example tab.
                  </p>
                </div>
              </Tab>
            </Tabs>
            </MuiThemeProvider>
      </div>
      );
  }
    
}
export default connect(
    (state) => { return {
      user: state.user,
      address: state.address
    }; },
    (dispatch) => { return {
    }; }
  )(Owner);