import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { signIn, } from "../api/firebaseApi";
import { UserConsumer, } from "../contexts";
import './Login.css';
const FormItem = Form.Item;

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errorMsg: '',
        };
    }

    handleSubmit = (e, signInFunc) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          signInFunc(values.userName, values.password).catch(err => {
              this.setState({
                  errorMsg: err.message,
              })
          })
        }
      });
    }

    render() {

      const { getFieldDecorator } = this.props.form;

      return (
        <UserConsumer>
        {({ currentUser, signIn, }) => {
            if (!currentUser) {
                return (
                    <Form onSubmit={(e) => this.handleSubmit(e, signIn)} className="login-form">
                        <FormItem>
                          {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                          })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                          })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                          )}
                        </FormItem>
                        <FormItem>
                          {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                          })(
                            <Checkbox>Remember me</Checkbox>
                          )}
                          <a className="login-form-forgot" href="">Forgot password</a>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                          </Button>
                          Or <a href="">register now!</a>
                        </FormItem>
                        <span className="errorMsg">
                          {this.state.errorMsg}
                        </span>
                    </Form>
                );
            }
        }}
        </UserConsumer>
      );
    }
}
  
export default Form.create()(LoginForm);
  
  