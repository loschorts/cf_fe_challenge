import React from 'react';
import ColorSpan from '../src/components/color_span';
import renderer from 'react-test-renderer';

test ('Renders nested markup', () => {
  const component = renderer.create(
    <ColorSpan>Hello</ColorSpan>
  )

  let tree = component.toJSON();

  expect(tree).toMatchSnapshot('Goodbye');

})

// test('Link changes the class when hovered', () => {
//   const component = renderer.create(
//     <Link page="http://www.facebook.com">Facebook</Link>
//   );
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseEnter();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();

//   // manually trigger the callback
//   tree.props.onMouseLeave();
//   // re-rendering
//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });