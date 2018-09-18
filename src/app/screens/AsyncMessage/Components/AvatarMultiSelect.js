import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Gravatar from './SelectBoxGravatar';

const stringOrNode = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
]);

let AvatarSize = 45;

const GravatarOption = createClass({
    propTypes: {
        children: PropTypes.node,
        className: PropTypes.string,
        isDisabled: PropTypes.bool,
        isFocused: PropTypes.bool,
        isSelected: PropTypes.bool,
        onFocus: PropTypes.func,
        onSelect: PropTypes.func,
        option: PropTypes.object.isRequired,
        onRemove: PropTypes.func.isRequired,
    },
    handleMouseDown(event) {
        event.preventDefault();
        event.stopPropagation();
        this.props.onSelect(this.props.option, event);
    },
    handleMouseEnter(event) {
        this.props.onFocus(this.props.option, event);
    },
    handleMouseMove(event) {
        if (this.props.isFocused) return;
        this.props.onFocus(this.props.option, event);
    },
    render() {
        return (
            <div className={this.props.className}
                 onMouseDown={this.handleMouseDown}
                 onMouseEnter={this.handleMouseEnter}
                 onMouseMove={this.handleMouseMove}
                 title={this.props.option.title}>
                <Gravatar value={this.props.option.value} size={AvatarSize} base={this.props.option.src} extension={this.props.option.extension}/>
                {this.props.children}
            </div>
        );
    }
});

const GravatarValue = createClass({
    propTypes: {
        children: PropTypes.node,
        placeholder: stringOrNode,
        value: PropTypes.object,
    },
    render() {
        return (
            <div className={"Select-value"} title={this.props.value.title}>
				<span className="Select-value-label">
					<Gravatar value={this.props.value.value} size={AvatarSize} base={this.props.value.src} extension={this.props.value.extension}/>
                    {this.props.children}
				</span>
                <span className="Select-value-icon" onMouseDown={e => {
                    if(!this.props.isDisabled) {
                        this.props.onRemove(this.props.value)
                    }
                    // for sanity's sake
                    e.stopPropagation()
                }} aria-hidden="true"/>
            </div>
        );
    }
});

const MultiSelectAvatar = createClass({
    propTypes: {
        hint: PropTypes.string,
        label: PropTypes.string,
    },
    getInitialState() {
        return {};
    },
    setValue(value) {
        this.props.onSelect(value);
        this.setState({value});
        return(value);
    },

    componentDidMount() {
        this.setState({
            value: ''
        });
    },

    render() {
        return (
            <div className="section SelectWithFlag">
                <Select
                    simpleValue
                    removeSelected={true}
                    closeOnSelect={this.props.closeOnSelect}
                    multi={this.props.multi}
                    onChange={this.setValue}
                    optionComponent={GravatarOption}
                    options={this.props.listItems}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    valueComponent={GravatarValue}
                    className={this.props.className}
                />
            </div>
        );
    }
});

export default MultiSelectAvatar;