import * as React from 'react'
import * as Styles from './index.scss'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'

const logo = require('../../static/images/nav-logo.png');
class Navigation extends React.PureComponent<null, null>{
    render() {
        return (
            <div className={Styles.mainHeaderBox}>
                <header className={Styles.mainHead}>
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
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        )
    }
}

export default Navigation