import React, { Component } from 'react';
import './styles.css';

class CheckBox extends Component {
    render() {
        return (
            <div className="form-check">
                <label htmlFor="userAgreement" className="form-check-label">
                    {this.props.children}
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={this.props.value}
                        id={this.props.id}
                        onChange={this.props.onChange} />
                    <span className="CheckboxIcon"></span>
                </label>
            </div>
        )
    }

};

export default CheckBox;