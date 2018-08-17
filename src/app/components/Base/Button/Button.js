import React from 'react';

class Button extends React.Component {
    render() {
        return(
            <button
                type={this.props.type}
                className={this.props.classname}
                onClick={this.props.onClick}
                disabled={this.props.disable}>
                {this.props.label}
            </button>
        );
    }
}

export default Button;