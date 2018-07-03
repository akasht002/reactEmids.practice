import React, { Component } from 'react';
import './styles.css';

class CheckBox extends Component {
    render() {
        return (
            <div className="form-check">
                <label className="form-check-label">
                    <span className="CheckboxIcon"></span>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.props.value}
                        id={this.props.id}
                        onChange={this.props.onChange} />
                    {this.props.children}
                </label>
            </div>
        )
    }

};

export default CheckBox;