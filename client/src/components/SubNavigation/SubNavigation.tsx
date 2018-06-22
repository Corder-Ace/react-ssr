import * as React from 'react';
import * as Styles from './index.scss';
import { NavLink } from 'react-router-dom';

export interface NavProps {
    switch: boolean
}

class SubNavigation extends React.PureComponent<NavProps, null>{

    render() {
        const open = this.props.switch
        return (
            <nav className={`${Styles.viewNav} ${open ? '' : Styles.top}`}>
                <ul className={Styles.navList}>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">我关注的</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">前端</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">iOS</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">后端</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">设计</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">产品</NavLink>
                    </li>
                    <li className={Styles.navItem}>
                        <NavLink to="/timeline/subscribe">阅读</NavLink>
                    </li>
                </ul>
            </nav>
        )
    }
}
export default SubNavigation