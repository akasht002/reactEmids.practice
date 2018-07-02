import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SelectBox extends React.Component {
    // render() {
    //     const options = this.props.option.map(function(number, i){
    //             return(
    //                 <option value={number.id} key={i}>{number.name}</option>
    //             )
    //         }
    //     );
    //     return(
    //     <div className="form-group">
    //         <label htmlFor={this.props.id}>{this.props.placeholder}</label> <i className={this.props.mandatory}>*</i>
    //         <select className="form-control" id={this.props.id} value={this.props.value} multiple={this.props.multiple} onChange={this.props.onChange}>
    //             {options}
    //         </select>
    //     </div>
    //     );
    // }

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