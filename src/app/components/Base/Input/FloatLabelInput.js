import React from 'react';
import './styles.css'
import FloatingLabelInput from 'react-floating-label-input';
import 'react-floating-label-input/dist/react-floating-label-input.css';

class FloatLabelInput extends React.Component {
    render() {
        return(<div className="form-group">
            <FloatingLabelInput type={this.props.type} id={this.props.id} label={this.props.label} shrink={99} value={this.props.value}
                onChange={this.props.onChange} className={this.props.className}/>
                <small id={this.props.name+"Help"} className="form-text text-muted">{this.props.help}</small>
        </div>
        );
    }
}

export default FloatLabelInput;