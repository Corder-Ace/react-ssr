import * as React from 'react'
import { Input, Button } from 'antd'
import Api from '../../api/api'
import { Link } from 'react-router-dom'
// import Cookies from 'js-cookie'
import * as Styles from './index.scss'

export interface LoginState {
    account?: string,
    password?: string,
    loading?: boolean
}

class Login extends React.PureComponent<any, LoginState>{
    constructor(props: any) {
        super(props)

        this.state = {
            account: '',
            password: '',
            loading: false
        }
    }

    //修改
    onChange(field: any, e: any) {
        this.setState({ [field]: e.target.value })
    }

    //点击login
    handleLogin = () => {
        const { account, password } = this.state
        let obj = {
            account,
            password
        }
        this.setState({ loading: true })
        this._login(obj)
    }

    //login api
    _login(obj: object) {
        Api.login(obj)
            .then(res => {
                if (res.code == 200) {
                    // Cookies.set('token', res.result.token)
                    this.setState({ loading: false })
                }
            })
    }

    render() {
        const { loading } = this.state
        return (
            <div className={Styles.login_mask} >
                <div className={Styles.login_container}>
                    <header className={Styles.login_head}>
                        <span className={Styles.login_label}>用户登录</span>
                        <span className={Styles.login_exit}>
                            <span className={Styles.exit_line_l} />
                            <span className={Styles.exit_line_r} />
                        </span>
                    </header>
                    <div className={Styles.login_item}>
                        <Input className={Styles.login_item} onChange={this.onChange.bind(this, 'account')} placeholder="请输入用户名" />
                        <Input className={Styles.login_item} onChange={this.onChange.bind(this, 'password')} type="password" placeholder="请输入密码" />
                        <Button className={Styles.login_btn} onClick={this.handleLogin.bind(this)} type="primary" icon="login" loading={loading}>登录</Button>
                    </div>
                    <div className={Styles.register_forget}>
                        <span className={Styles.login_label}>
                            <Link to="/register">立即注册</Link>
                        </span>
                        <span className={Styles.login_forget}>
                            <Link to="/forget">忘记密码?</Link>
                        </span>
                    </div>
                    <div className={Styles.login_other}>
                        <div className={Styles.login_tit}>
                            <i />
                            <span>一键登录</span>
                        </div>
                        <div className={Styles.other_link}>
                            <span />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login  