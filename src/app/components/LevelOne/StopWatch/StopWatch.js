
import React, { Component } from "react";

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
        let timer  = props.duration
        this.state = {
            secondsElapsed: timer,
            laps: [],
            lastClearedIncrementer: null,
            startTimer: false
        };
        this.incrementer = null;
    }

    componentDidMount() {
        if (!this.props.stopTimer) {
            this.handleStartClick()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.stopTimer) {
            this.handleStopClick()           
        }
        if(this.props.duration !== nextProps.duration){
            this.setState({secondsElapsed: nextProps.duration})
        }
    }

    handleStartClick() {
        this.incrementer = setInterval(() =>
            this.setState({
                secondsElapsed: parseInt(this.state.secondsElapsed,0) + 1,
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
                {/* {this.state.startTimer ?
                    <span className="TimerContent running">{formattedSeconds(this.state.secondsElapsed)}</span>
                    :
                    <span className="TimerContent running">HH<i>:</i>MM<i>:</i>SS</span>
                } */}
                <span className="TimerContent running">{formattedSeconds(parseInt(this.state.secondsElapsed,10))}</span>
            </div>
        );
    }
}

export default StopWatch