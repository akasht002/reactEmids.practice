import React from 'react';

class TextArea extends React.Component {
    render() {
        return(<div className="form-group">
            <label htmlFor={this.props.name}>{this.props.value}</label> <i className={this.props.mandatory}>*</i>
            <textarea 
                id={this.props.name}
                required
                placeholder={this.props.placeholder}
                className={this.props.className}
                rows={this.props.rows}
                maxLength={this.props.maxlength}
            />
        </div>
        );
    }
}

export default TextArea;