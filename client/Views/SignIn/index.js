import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField"
import Card from "material-ui/Card"
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import bigg from 'SharedStyles/bigg.jpg';
import Button from 'Components/Button';
import { fetchSignIn } from './actions';
import { SIGNIN_NAMENULL } from './constants';
let userNameTF;
let passTF;
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameError: "",
            passError: "",
            error: "",
        }
    }
    componentDidMount() {
        userNameTF = this.refs.userNameTF;
        passTF = this.refs.passTF;
    }
    onSignIn() {
        let userNameStr = userNameTF.getValue();
        let passStr = passTF.getValue();
        let infoFinished = true;
        if ("" === userNameStr) {
            this.setState({
                nameError: "不能为空"
            });
            infoFinished = false;
        }
        if ("" === passStr) {
            this.setState({
                passError: "不能为空"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }

        let body = {
            "userName": userNameStr,
            "passWord": passStr,
        };
        let url = "/api/user/SignIn";
        fetch(url, {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                if (json.result) {
                    if (json.result.redirect) {
                        window.location = json.result.redirect;
                    }
                } else if (json.error) {
                    this.setState({
                        error: json.error.errorMsg
                    });
                }
            }
        ).catch(
            console.error('parsing failed', ex)
        )
    }
    render() {
        const props = this.props.user;
        return (
        <div className="login-banner">
            <div className="login-main">
                <div className="login-banner-bg"><span></span><img src={bigg} /></div>
                <div className="login-box">
                <h3 className="title">登录商城</h3>
                <div style={{
                    clear: 'both'
                }}></div>
                <div className="login-form">
                    <MuiThemeProvider>
                    <Card style={{
                                marginLeft:"1em",
                                marginTop: "1em",
                                width: "20em",
                            }}>
                                <div style={{
                                    padding: "1em",
                                    display: "flex",
                                    flexDirection: "column",
                                }}>
                                    <div >
                                        用户名*
                                    </div>
                                    <TextField style={{marginBottom: "1em", flex: 1}}
                                            errorText={this.state.nameError}
                                            onChange={
                                                (event, str) => {
                                                    if (this.state.nameError !== null) {
                                                        this.setState({
                                                            nameError: "",
                                                            passError: "",
                                                            error: ""
                                                        })
                                                    }
                                                }}
                                            ref="userNameTF"
                                            id="userNameTF"
                                            name="userNameTF"/>
                                    <div>
                                        密码*
                                    </div>
                                    <TextField style={{marginBottom: "1em"}}
                                            errorText={this.state.passError}
                                            onChange={(event, str) => {
                                                if (this.state.passError !== null) {
                                                    this.setState({
                                                        nameError: "",
                                                        passError: "",
                                                        error: ""
                                                    })
                                                }
                                            }}
                                            type="password"
                                            ref="passTF"
                                            id="passTF"
                                            name="passTF"/>
                                    <span style={{color:"red"}}>{this.state.error}</span>
                                    <Button onClick={() => this.onSignIn()}
                                                primary={true}
                                                style={{width: "256px", alignSelf: "center",borderRadius:"5px",backgroundColor:"#6FCE53"}}
                                    >登录</Button>
                                </div>
                            </Card>
                            </MuiThemeProvider>
                </div>
                </div>
            </div>
            </div>
          
        );
    }
}
export default connect(
    (state) => { return {
        user: state.user,
      }; },
    (dispatch) => { return {
        fetchSignIn: (body) => { dispatch(fetchSignIn(body)); }, 
    }}
)(SignIn);
