import React, { Component } from 'react';

class CoreoRadio extends Component {
    render() {
        return (
            <input
                className={this.props.className}
                name={this.props.name}
                id={this.props.id}
                type="radio"
                checked={this.props.checked}
                value={this.props.value}
                onChange={this.props.onChange}
                disabled={this.props.disabled}
            />
        );
    }
}

export default CoreoRadio;