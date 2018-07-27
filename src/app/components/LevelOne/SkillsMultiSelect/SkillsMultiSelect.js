import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';
import "./styles.css"

const SkillsMultiSelect = createClass({
    propTypes: {
        hint: PropTypes.string,
        label: PropTypes.string,
    },
    getInitialState() {
        return {};
    },
    setValue(value) {
        this.props.onselect(value);
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
                    options={this.props.listItems}
                    placeholder={this.props.placeholder}
                    value={this.props.value}                   
                    className={this.props.className}
                />
            </div>
        );
    }
});

export default SkillsMultiSelect;