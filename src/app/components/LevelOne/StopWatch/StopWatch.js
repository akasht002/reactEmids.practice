
import React, { Component } from "react";

const formattedSeconds = (sec) =>
    Math.floor(sec / 60) +
    ':' +
    ('0' + sec % 60).slice(-2);


class StopWatch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed: 0,
            laps: [],
            lastClearedIncrementer: null,
            startTimer: false
        };
        this.incrementer = null;
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
                    <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                    :
                    <span className="TimerContent running">HH<i>:</i>MM</span>
                }
            </div>
        );
    }
}

export default StopWatch