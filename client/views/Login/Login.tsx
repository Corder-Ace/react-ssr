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
            if (res.code == 200) {
                Cookies.set('token', res.result.token)
            }
        })
    }
    render() {
        return (
            <div className={Styles.login_mask} >
                <div className={Styles.login_container}>
                    <header className={Styles.login_head}>
                        <span className={Styles.login_label}>用户登录</span>
                    </header>
                    <div>
                        <Input className={Styles.login_item} onChange={this.onChange.bind(this, 'account')} placeholder="请输入用户名" />
                        <Input className={Styles.login_item} onChange={this.onChange.bind(this, 'password')} type="password" placeholder="请输入密码" />
                        <Button className={Styles.login_btn} type="primary" onClick={this.handleLogin.bind(this)}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login  