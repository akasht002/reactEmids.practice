import React, {Component} from 'react'
import isRetina from 'is-retina'

class Gravatar extends Component {

    render() {
        var base = this.props.base;
        const formattedValue = this.props.value;

        const src = base + '.' + this.props.extension;

        let modernBrowser = true;

        if (typeof window !== 'undefined') {
            modernBrowser = 'srcset' in document.createElement('img')
        }

        let className = 'react-gravatar';
        if (this.props.className) {
            className = `${className} ${this.props.className}`
        }

        let { ...rest } = this.props;
        delete rest.md5;
        delete rest.protocol;
        delete rest.rating;
        delete rest.size;
        delete rest.style;
        delete rest.className;
        delete rest.default;
        if (!modernBrowser && isRetina()) {
            return (
                <img
                    alt={`${formattedValue}`}
                    style={this.props.style}
                    src={require('../../../assets/images/Flags/' + src)}
                    height={this.props.size}
                    width={this.props.size}
                    {...rest}
                    className={className}
                />
            )
        }
        return (
            <img
                alt={`${formattedValue}`}
                src={require('../../../assets/images/Flags/' + src)}
                height={this.props.size}
                width={this.props.size}
                {...rest}
                className={className}
            />
        )
    }
}


export default Gravatar;