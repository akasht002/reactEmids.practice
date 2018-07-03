import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectBox extends React.Component {
    render() {
        return (
            <Select
                options={this.props.options}
                simpleValue
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                value={this.props.selectedValue}
            />
        )
    }
}

export default SelectBox;