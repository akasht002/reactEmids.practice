import React from 'react';
import SelectBox from './Select';
import renderer from 'react-test-renderer';

test('SelectBox Component Jest', () => {
const SelectPlan = [
    { label: "Plan One", value: 1,  },
    { label: "Plan Two", value: 2,  },
    { label: "Plan Three", value: 3,  },
    { label: "Plan Four", value: 4,  },
    { label: "Plan Five", value: 5,  },
    { label: "Plan Six", value: 6,  },
    { label: "Plan Seven", value: 7,  },
    { label: "Plan Eight", value: 8,  },
    { label: "Plan Nine", value: 9,  },
];
  const component = renderer.create(
    <SelectBox options={SelectPlan} id='1' placeholder='Select' value='John Doe'></SelectBox>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

