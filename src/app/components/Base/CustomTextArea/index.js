import React from 'react';

class CustomTextArea extends React.Component {
    render() {
        return(<div className="form-group">
            <label htmlFor={this.props.name}>{this.props.name}</label> <i className={this.props.mandatory}></i>
            <textarea 
                id={this.props.name}
                required={this.props.required}
                placeholder={this.props.placeholder}
                className={this.props.className}
                rows={this.props.rows}
                maxLength={this.props.maxlength}
                onChange={this.props.textChange}
                value={this.props.value}
                disabled={this.props.disabled}
            />
            <span className="char-limit-block">{`${this.props.maxlength} character max`}</span>
        </div>
        );
    }
}

export default CustomTextArea;