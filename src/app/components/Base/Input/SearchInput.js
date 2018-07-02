import React from 'react';

class SearchInput extends React.Component {
    render() {
        return(
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Q</span>
                </div>
                <input
                    id={this.props.name}
                    autoComplete={this.props.autoComplete}
                    placeholder={this.props.placeholder}
                    className={this.props.className}
                />
            </div>
            
        );
    }
}

export default SearchInput;