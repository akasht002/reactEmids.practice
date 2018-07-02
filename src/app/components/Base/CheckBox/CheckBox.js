import React from 'react';

class Checkbox extends React.Component {
    render() {
        const label = this.props.label;
        const options = this.props.name.map(function(number){
                return(
                    <div className="form-check form-check-inline">
                        <label className="form-check-label">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="Checkbox"
                                value={number}
                            />
                            {number}
                        </label>
                </div>
                )
            }
        );
        return(
        <div className="form-group">
            {options}
        </div>
        );
    }
}

export default Checkbox;