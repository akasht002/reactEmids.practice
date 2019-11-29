import React from 'react';	
import CustomTextArea  from './index';	
import renderer from 'react-test-renderer';	

 test('CustomTextArea Component Testing', () => {	
    const component = renderer.create(	
        <CustomTextArea	
            id={1}	
            required={false}	
            placeholder={'TextArea'}	
            className={'TextArea'}	
            rows={20}	
            maxLength={1000}	
            value={'TextArea'}>	
        </CustomTextArea>,	
    );	
    let tree = component.toJSON();	
    expect(tree).toMatchSnapshot();	
});