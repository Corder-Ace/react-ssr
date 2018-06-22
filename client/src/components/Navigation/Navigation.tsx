import * as React from 'react'
import * as Styles from './index.scss'
import { Link, NavLink } from 'react-router-dom'
import { Icon } from 'antd'

const logo = require('../../static/images/nav-logo.png');

export interface NavProps {
    switch: boolean
}

class Navigation extends React.PureComponent<NavProps, null>{
    render() {
        const open = this.props.switch
        return (
            <div className={Styles.mainHeaderBox}>
                <header className={open ? Styles.visable : Styles.mainHead}>
                    <div className={Styles.container}>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                        <nav className={Styles.mainNav}>
                            <ul className={Styles.navList}>
                                <li className={Styles.mainNavList}>
                                    <div className={Styles.phoneShowMenu}>
                                        <span>首页</span>
                                        <Icon type="caret-down" className={Styles.arrowDown} />
                                    </div>
                                </li>
                                <li className={Styles.navItem}>
                                    <NavLink to="/" activeClassName={Styles.linkItem}>首页</NavLink>
                                </li>
                                <li className={Styles.navItem}>
                                    <NavLink to="/frontend" activeClassName={Styles.linkItem}>前端</NavLink>
                                </li>
                                <li className={Styles.navItem}>
                                    <NavLink to="/diy" activeClassName={Styles.linkItem}>DIY</NavLink>
                                </li>
                                <li className={Styles.navItem}>
                                    <NavLink to="/diy" activeClassName={Styles.linkItem}>手绘</NavLink>
                                </li>
                                <li className={Styles.navItem}>
                                    <span className={Styles.login}>
                                        <Link to="/login">登录</Link>
                                    </span>
                                    <span className={Styles.register}>
                                        <Link to="/rigister">注册</Link>
                                    </span>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div >
        )
    }
}

export default Navigation