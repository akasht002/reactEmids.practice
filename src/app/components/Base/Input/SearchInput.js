import React from 'react';

class SearchInput extends React.Component {
    render() {
        return(
            <div className="input-group">
                <span className={this.props.iconName} />
                <input
                    id={this.props.name}
                    autoComplete={this.props.autoComplete}
                    placeholder={this.props.placeholder}
                    className={this.props.className}
                    disabled={this.props.disable}
                />
            </div>
            
        );
    }
}

export default SearchInput;