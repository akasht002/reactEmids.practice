import React, { Component } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AsideScreenCover } from '../ScreenCover/AsideScreenCover';
import TeleHealthWidget from './TeleHealthWidget';
import { generateToken, clearRoom  } from '../../redux/telehealth/actions';
import './styles.css';

class TeleHealth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Participants: false,
            width: '',
            height: ''
        }
    }

    componentDidMount() {
        this.updateHeight();
        window.addEventListener("load", this.updateHeight);
        window.addEventListener("resize", this.updateHeight);
    }

    componentDidUpdate() {
        this.updateHeight();
    }

    componentWillUnmount() {
        this.props.clearRoom();
    }

    updateHeight = () => {
        if (window.innerWidth <= '768' && window.innerWidth >= '479') {
            this.setState({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }
        if (window.innerWidth <= '480') {
            this.setState({
                height: window.innerHeight + 30,
                width: window.innerWidth,
            })
        }
    }

    componentWillMount() {
        this.props.generateToken();
    }

    render() {
        return (
            <AsideScreenCover>
                <div className='TeleHealth ProfileHeaderWidget'>
                    <div className='ProfileHeaderTitle'>
                        <h5 className='theme-primary m-0'>Video Conference</h5>
                        <span className="TeleHealthViewParticipants" onClick={() => { }} />
                    </div>
                </div>
                <div className={'col-md-12 TeleHealthWidget ' + this.state.Participants}
                    style={{ 'height': `${this.state.height - 150}px` }}>
                    {this.props.telehealthToken &&
                        <TeleHealthWidget
                            telehealthToken={this.props.telehealthToken}
                            roomId={this.props.roomId}
                        />
                    }
                </div>
            </AsideScreenCover>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        generateToken: () => dispatch(generateToken()),
        clearRoom: () => dispatch(clearRoom())
    }
}

function mapStateToProps(state) {
    return {
        telehealthToken: state.telehealthState.token,
        roomId: state.telehealthState.roomId
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TeleHealth));
