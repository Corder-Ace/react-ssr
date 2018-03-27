import * as React from 'react'
import { Input, Button } from 'antd'
import { login } from '../../api/api'
import Cookies from 'js-cookie'
import * as Styles from './index.scss'

export interface LoginState {
    account: String,
    password: String
}

class Login extends React.PureComponent<{}, LoginState>{
    constructor(props: any) {
        super(props)

        this.state = {
            account: '',
            password: ''
        }
    }

    onChange(field: any, e: any) {
        this.setState({ [field]: e.target.value })
    }

    handleLogin = () => {
        let obj = {
            account: this.state.account,
            password: this.state.password
        }

        login(obj).then(res => {
            if(res.code == 200){
                Cookies.set('token',res.result.token)
            }
        })
    }
    render() {
        return (
            <div className={Styles.login}>
                <Input onChange={this.onChange.bind(this, 'account')} placeholder="请输入用户名" />
                <Input onChange={this.onChange.bind(this, 'password')} type="password"  placeholder="请输入密码" />
                <Button type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
            </div>
        )
    }
}

export default Login