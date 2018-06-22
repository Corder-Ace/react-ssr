import * as React from 'react';
import * as Styles from './index.scss';
import Navigation from 'components/Navigation/Navigation';
import SubNavigation from '../../components/SubNavigation/SubNavigation';


export interface SubscribeState {
    navShow: boolean
}

class Subscribe extends React.Component<null, SubscribeState> {
    constructor(props: any) {
        super(props)

        this.state = {
            navShow: true
        }
    }
    componentDidMount() {
        window.onscroll = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 80) {
                this.setState({ navShow: false })
            } else if (scrollTop < 80) {
                this.setState({ navShow: true })
            }
        }
    }
    render() {
        const { navShow } = this.state
        return [
            <Navigation key={1} switch={navShow}/>,
            <main key={2} className={`${Styles.container}`}>
                <div className={Styles.timelineView}>
                    <SubNavigation switch={navShow} />
                </div>
            </main>]

    }
}

export default Subscribe
