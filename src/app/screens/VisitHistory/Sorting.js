import '@zendeskgarden/react-select/dist/styles.css';

import { ThemeProvider } from '@zendeskgarden/react-theming';
import { SelectField, Label, Hint, Select, Item } from '@zendeskgarden/react-select';
import React from "react";

class Sorting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: ''
        };
    };
    render() {
        return (
            <ThemeProvider>
                <SelectField>
                    <Select
                        selectedKey={this.state.selectedKey}
                        placement="auto"
                        onChange={selectedKey => this.setState({selectedKey})}
                        options={[
                            <Item disabled className='ListItem disabled' key="item-1">Visit Date</Item>,
                            <Item className='ListItem' key="item-2">Newest</Item>,
                            <Item className='ListItem' key="item-2">Oldest</Item>,
                        ]}
                        className='SelectDropDown sorting'
                    >{this.state.selectedKey}</Select>
                    
                </SelectField>
            </ThemeProvider>
        )}
}

export default Sorting;