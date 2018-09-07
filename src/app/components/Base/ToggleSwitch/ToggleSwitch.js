import React from "react"
import './styles/toggleSwitch.css'

 class ToggleSwitch extends React.Component {
    render() {
        return (
            <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"/>
            </label>
        )
    }
}

export default ToggleSwitch