import React from "react";

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        const label = this.props.label;
        const type = this.props.type;
        const options = this.props.name.map(function(number, i) {
                    return (
                        <div className="form-check form-check-inline selectType">
                                <input
                                    id={"checkbox" + i+1}
                                    className="form-check-input"
                                    type={type}
                                    name="Checkbox"
                                    value={i + 1}
                                />
                            <label htmlFor={"checkbox" + i+1} className={"form-check-label " + number.name}>
                                <span className="text-capitalize">
                                    {number.name}
                                    <small className="text-muted">{number.desc}</small>
                                </span>
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