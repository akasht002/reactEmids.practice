import React from 'react';

class TextArea extends React.Component {    
    render() {
        var style = {
            resize: 'none'
          };
        return(<div className="form-group">
            <label htmlFor={this.props.name}>{this.props.name}</label> <i className={this.props.mandatory}></i>
            <textarea 
                id={this.props.name}
                required={this.props.required}
                placeholder={this.props.placeholder}
                className={this.props.className}
                rows={this.props.rows}
                style={style}
                maxLength={this.props.maxlength}
                onChange={this.props.textChange}
                value={this.props.value}
            />
        </div>
        );
    }
}

export default TextArea;