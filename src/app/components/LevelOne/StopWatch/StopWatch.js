
import React, { Component } from "react";
import {convertUTCTime} from '../../../utils/dateUtility'

function pad(num) {
    return ("0" + num).slice(-2);
}

export const formattedSeconds = (secs) => {
    var minutes = Math.floor(secs / 60);
    secs = secs % 60;
    var hours = Math.floor(minutes / 60)
    minutes = minutes % 60;
    return pad(hours) + ":" + pad(minutes) + ":" + pad(secs);
}
class StopWatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: props.startTime ? convertUTCTime(props.startTime) : 0,
            laps: [],
            lastClearedIncrementer: null,
            startTimer: false
        };
        this.incrementer = null;
    }

    componentDidMount(){
        this.handleStartClick()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.stopTimer != nextProps.stopTimer){
            if(nextProps.stopTimer){
                this.handleStopClick()
            }
        }
    }

    handleStartClick() {
        this.incrementer = setInterval(() =>
            this.setState({
                secondsElapsed: this.state.secondsElapsed + 1,
                startTimer: true
            })
            , 1000);
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({
            lastClearedIncrementer: this.incrementer
        });
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    handleLabClick() {
        this.setState({
            laps: this.state.laps.concat([this.state.secondsElapsed])
        })
    }

    render() {
        return (
            <div className="stopwatch">
                {this.state.startTimer ?
                    <span className="TimerContent running">{formattedSeconds(this.state.secondsElapsed)}</span>
                    :
                    <span className="TimerContent running">HH<i>:</i>MM<i>:</i>SS</span>
                }
            </div>
        );
    }
}

export default StopWatch