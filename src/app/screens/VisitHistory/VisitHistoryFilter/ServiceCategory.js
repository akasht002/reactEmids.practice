import React,{Component} from "react";
import PropTypes from 'prop-types';
import Select from "react-select";
class ServiceCategory extends Component {

    render() {
        
        return(
            <Select
                id={this.props.id}
                searchable={this.props.searchable}
                placeholder={this.props.placeholder}
                className={this.props.className}
                value={this.props.value}
                options={this.props.options}
                onChange={this.props.onChange}
            />
        )
    }
}

ServiceCategory.propTypes ={
    id:PropTypes.string,
    searchable: PropTypes.bool,
    placeholder:PropTypes.string,
    className:PropTypes.string,
    onChange:PropTypes.func,
    options:PropTypes.array
}

export default ServiceCategory;