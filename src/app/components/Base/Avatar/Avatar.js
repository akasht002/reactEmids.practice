import React from 'react';

class Avatar extends React.Component {
    render() {
        return(
            <img
            alt={this.props.alt}
            className={this.props.className}
            src={this.props.src}
            key={this.props.key}
        />
        );
    }
}

export default Avatar;