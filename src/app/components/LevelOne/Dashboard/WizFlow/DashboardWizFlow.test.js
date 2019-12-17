import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import {DashboardWizFlow} from './index';

Enzyme.configure({ adapter: new Adapter() })

const data = [{
  id: 1,
  title: 'Select Your Profile Type',
  label: 'Select whether you want services for yourself or for others',
  status: ''
},
{
  id: 2,
  title: 'Set My Email Address',
  label: 'Verify Email Address with the verification link and set Email Address',
  status: ''
},
{
  id: 3,
  title: 'Set My Password',
  label: 'Set new password and confirm',
  status: ''
},
{
  id: 4,
  title: 'Provide Member Details',
  label: 'Enter member details and select plan',
  status: ''
},
{
  id: 5,
  title: 'Add Guardian (Optional)',
  label: 'Add a guardian to help with your needs',
  status: ''
}]

describe('CoreoWizFlow', () => {
  it('should return correct component', () => {
    const wrapper = mount(
      <DashboardWizFlow VisitProcessingNavigationData={data} activeFlowId={2}/>
    )
    expect(wrapper).toBeDefined();
  })
}); 