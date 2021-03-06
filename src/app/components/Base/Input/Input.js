import React from 'react';

class Input extends React.Component {
    render() {
        return(<div className="form-group">
            <label className="m-0" htmlFor={this.props.name}>{this.props.label}</label>
            <span className={this.props.PhoneInput}>
            <input 
                id={this.props.name}
                autoComplete={this.props.autoComplete}
                required={this.props.required}
                pattern={this.props.pattern}
                type={this.props.type}
                placeholder={this.props.placeholder}
                className={this.props.className}
                disabled={this.props.disabled}
                maxLength={this.props.maxlength}
                onChange={this.props.textChange}
                value={this.props.value}
                onBlur={this.props.onBlur}
                onCopy={this.props.onCopy}
                onPaste={this.props.onPaste}
            />
            </span>
                <small id={this.props.name+"Help"} className={"form-text text-muted " + this.props.iconStyle}>{this.props.help}</small>
        </div>
        );
    }
}

export default Input;