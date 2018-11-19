import React from 'react';
import './styles.css'

export default class Progressbar extends React.Component {
    render() {
        let progress_bar = this.props.totaltask !== 0 ? Math.round((this.props.taskCompleted / this.props.totaltask) * 100) : 0
        return (
            <div className='visitListTask'>
                <span className='bottomTaskName'>Tasks</span>
                <span className='bottomTaskRange'>
                    <i
                        style={{ width: progress_bar + '%' }}
                        className='bottomTaskCompletedRange'
                    />
                </span>
                <span className='bottomTaskPercentage'>{progress_bar}%</span>
            </div>
        );
    }
}