import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import bigg from 'SharedStyles/bigg.jpg';

let uploadInput;
let userNameTF;
let passTF;
let passConfirmTF;
let file;
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedGender: 1,
            avatarUrl: "",
            selectedFileName: "",
            nameError: "",
            passError: "",
            passConfirmError: "",
        }
    }

    componentDidMount() {
        uploadInput = this.refs.uploadInput;
        userNameTF = this.refs.userNameTF;
        passTF = this.refs.passTF;
        passConfirmTF = this.refs.passConfirmTF;
    }

    genderSelected(event, index, value) {
        this.setState({
            selectedGender: value
        })
    }

    onUpLoadClick() {
        console.log("onUpLoadClick=");
        uploadInput.click();
    }

    avatarSelected(event) {
        file = uploadInput.files[0];
        console.info("file=" + file.name);
        this.setState({
            selectedFileName: file.name
        });
    }

    onSignUp() {
        console.log('onsignin');
        let userNameStr = userNameTF.getValue();
        let passStr = passTF.getValue();
        let passConfirmStr = passConfirmTF.getValue();

        let infoFinished = true;
        let pattern1 = /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,10}$/
        if (!pattern1.test(userNameStr)) {
            this.setState({
                nameError: "请输入正确用户名"
            });
            infoFinished = false;
        }
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
        if ("" === passConfirmStr) {
            this.setState({
                passConfirmError: "不能为空"
            });
            infoFinished = false;
        }
        if (passConfirmStr !== passStr) {
            this.setState({
                passError: "密码不一致",
                passConfirmError: "密码不一致"
            });
            infoFinished = false;
        }
        if (!infoFinished) {
            return;
        }

       
        let formData = new FormData();
        formData.append('avatar', file);
        formData.append('userName', userNameStr);
        formData.append('passWord', passStr);
        formData.append('passConfirm', passConfirmStr);

        let url = "/api/user/SignUp";
        fetch(url, {
            method: "post",
            body: formData,
            credentials: 'include'     //很重要，设置session,cookie可用
        }).then(
            (response) => {
                return response.json();
            }
        ).then(
            (json) => {
                console.log(JSON.stringify(json));
                if (json.result) {
                    let result=json.result;
                    if (result.redirect) {
                        window.location = result.redirect;
                    } else if (result.userOccupied) {
                        this.setState({
                            nameError: "用户名已被占用"
                        })
                    }
                }
            }
        ).catch(
            (ex) => {
                console.error('parsing failed', ex);
            });
    }

    render() {
        console.log('signup');
        return (
      <div className="login-banner">
      <div className="login-main">
        <div className="login-banner-bg"><span></span><img src={bigg} /></div>
        <div className="login-box">
          <h3 className="title">用户注册</h3>
          <div className="clear"></div>
          <div className="login-form">
            <MuiThemeProvider>
            <Card style={{
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
                            <TextField style={{ flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.nameError}
                                       onChange={
                                           (event, str) => {
                                               if (this.state.nameError !== "") {
                                                   this.setState({
                                                       nameError: ""
                                                   })
                                               }
                                           }}
                                       ref="userNameTF"
                                       id="userNameTF"
                                       name="userNameTF"/>
                            <div>
                                密码*
                            </div>
                            <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.passError}
                                       onChange={(event, str) => {
                                           if (this.state.passError !== "") {
                                               this.setState({
                                                   passError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passTF"
                                       id="passTF"
                                       name="passTF"/>
                            <div>
                                重复密码*
                            </div>
                            <TextField style={{flex: 1,height:"32px",marginBottom:"0.5em"}}
                                       errorText={this.state.passConfirmError}
                                       onChange={(event, str) => {
                                           if (this.state.passConfirmError !== "") {
                                               this.setState({
                                                   passError: "",
                                                   passConfirmError: ""
                                               })
                                           }
                                       }}
                                       type="password"
                                       ref="passConfirmTF"
                                       id="passConfirmTF"
                                       name="passConfirmTF"/>

                            <div style={{flex: 1,height:"32px",marginBottom:"0.5em"}}>
                                <span>头像</span>
                                <RaisedButton onTouchTap={() => this.onUpLoadClick()}
                                              label={"选择文件"} 
                                              secondary={true}
                                              style={{marginLeft: "0.5em",backgroundColor:"#eaeaea",borderRadius:"3px"}}
                                />
                            </div>
                            <div style={{flex: 1,height:"32px"}}>
                                {this.state.selectedFileName}
                            </div>
                            <input type="file"
                                   multiple="multiple"
                                   accept="image/*"
                                   ref="uploadInput"
                                   name="uploadInput"
                                   style={{display: "none"}}
                                   onChange={(event) => this.avatarSelected(event)}/>
                             <RaisedButton onTouchTap={() => this.onSignUp()}
                                          primary={true}
                                          label={"注册"}
                                          style={{width: "20em", alignSelf: "center",color:"red"}}
                            />
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
export default SignUp;