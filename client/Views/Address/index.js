import {connect} from 'react-redux';
import { getAddress } from './actions';
import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import { Link } from 'react-router';
import Button from 'Components/Button';
import TextField from "material-ui/TextField";

let nameTF, telTF, addressTF;
class myAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
        open: false,
        name: '',
        tel: '',
        address: '',
        nameError: '',
        telError: '',
        addressError: ''
    }
  }
  componentDidMount() {
    const {
      getAddress
    } = this.props;
    nameTF = this.refs.nameTF;
    telTF = this.refs.telTF;
    addressTF = this.refs.addressTF;
  }

  handleToggle = () => this.setState({open: !this.state.open});

  onAdd(addressId = '') {
    let nameStr = nameTF.getValue();
    let telStr = telTF.getValue();
    let addressStr = addressTF.getValue();  
    let infoFinished = true;
    if (nameStr === "") {
        this.setState({
            nameError: "不能为空"
        });
        infoFinished = false;
    }
    if (telStr === "") {
        this.setState({
            telError: "不能为空"
        });
        infoFinished = false;
    }
    if (addressStr === "") {
        this.setState({
            addressError: "不能为空"
        });
        infoFinished = false;
    }
    if (!infoFinished) {
        return;
    }
    let body = {
        "name": nameStr,
        "tel": telStr,
        "address": addressStr
    }
    let url = addressId === '' ? "/api/address/Addaddress" : `/api/address/Modifyaddress/${addressId}`;
    fetch(url, {
        method: "post",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'     
    }).then(
        (response) => {
            return response.json();
        }
    ).then(
        (json) => {
            if (json.result) {
                let result=json.result;
                if (result.redirect) {
                    window.location.href = result.redirect;
                }
                else {
                    // this.setState({failureOpen: true})
                }
            }
        }
    ).catch(
       console.error('error')
    )
}

  render() {
    const { address } = this.props;
    return(
        <div style={{
            width:'800px',
            margin:'30px auto'
          }}>
        <MuiThemeProvider>
            <RaisedButton
            label="新增地址"
            onClick={this.handleToggle}
            />
        </MuiThemeProvider>
        <MuiThemeProvider>
            <Drawer width={260}  open={this.state.open}>
                <div style={{marginTop:'20px'}}>
                    <span>新增收货地址</span>
                    <div>收货人：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.nameError}
                                value={this.state.name || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({name: str});
                                        if (this.state.nameError !== "") {
                                            this.setState({
                                                nameError: ""
                                            })
                                        }
                                }}
                                id="nameTF"
                                ref="nameTF"/> 
                    <div>电话：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.telError}
                                value={this.state.tel || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({tel: str});
                                        if (this.state.telError !== "") {
                                            this.setState({
                                                telError: ""
                                            })
                                        }
                                }}
                                id="telTF"
                                ref="telTF"/> 
                     <div>地址：</div>
                    <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                errorText={this.state.addressError}
                                value={this.state.address || ""}
                                onChange={
                                    (event, str) => {
                                        this.setState({address: str});
                                        if (this.state.addressError !== "") {
                                            this.setState({
                                                addressError: ""
                                            })
                                        }
                                }}
                                id="addressTF"
                                ref="addressTF"/> 
                    <Button onClick={() => this.onAdd()}
                                          primary={true}
                                          style={{width: "120px", alignSelf: "center", borderRadius:"5px", backgroundColor:"#6FCE53", color:"#fff"}}
                    >添加</Button>}
                </div>
            </Drawer>
        </MuiThemeProvider>
        {address.fetchingAddress && 
          <MuiThemeProvider>
            <List  style={{backgroundColor:'#eee',borderRadius:'2px',width:'600px',float:'left'}}>
              {address.address.map(item => (
                <ListItem key={item._id}
                  style={{
                    height:'100px',
                    margin:'10px'
                  }}
                  primaryText={
                    <div style={{marginLeft:'80px'}}>
                        <span style={{display:'inline-block', marginRight:'20px'}}>{item.name}</span>
                        <span style={{display:'inline-block', marginRight:'20px'}}>{item.tel}</span>
                    </div>
                  }
                  secondaryText={
                    <div style={{marginLeft:'80px',marginTop:'20px'}}>
                        <span>{item.address}</span>
                    </div>
                  }
                />
              ))}
            </List>
          </MuiThemeProvider>
        }
      </div>
    )
  }
}
export default connect(
    (state) => { return {
      user: state.user,
      address: state.address
    }; },
    (dispatch) => { return {
    }; }
  )(myAddress);