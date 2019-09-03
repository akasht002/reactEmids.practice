import React, { Component } from 'react';

class CoreoCheckBox extends Component {
    render() {
        return (
            <input
                type="checkbox"
                id={this.props.id}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                defaultChecked={this.props.defaultChecked}
                className={this.props.className}
                checked={this.props.checked}
            />
        );
    }
}

export default CoreoCheckBox;