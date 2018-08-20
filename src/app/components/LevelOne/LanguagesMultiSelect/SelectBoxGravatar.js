import React from 'react'
import isRetina from 'is-retina'
import createClass from 'create-react-class';
import PropTypes from 'prop-types'

const Gravatar = createClass({
    propTypes: {
        base: PropTypes.string,
        value: PropTypes.string,
        size: PropTypes.number,
        rating: PropTypes.string,
        default: PropTypes.string,
        className: PropTypes.string,
        protocol: PropTypes.string,
        style: PropTypes.object,
        extension: PropTypes.string
    },
    defaultProps: {
        size: 50,
        rating: 'g',
        default: 'retro',
        protocol: '//',
    },

    render() {
        var base = this.props.base;
        const formattedValue = this.props.value;
        // const src = base + formattedValue + '.' + this.props.extension;
        // const retinaSrc = base + formattedValue + '.' + this.props.extension;
        const src = base + '.' + this.props.extension;
        const retinaSrc = base + '.' + this.props.extension;

        let modernBrowser = true;  // server-side, we render for modern browsers

        if (typeof window !== 'undefined') {
            // this is not NodeJS
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
                    // src={retinaSrc}
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
                style={this.props.style}
                // src={src}
                // srcSet={`${retinaSrc} 2x`}
                src={require('../../../assets/images/Flags/' + src)}
                height={this.props.size}
                width={this.props.size}
                {...rest}
                className={className}
            />
        )
    }
});


export default Gravatar;