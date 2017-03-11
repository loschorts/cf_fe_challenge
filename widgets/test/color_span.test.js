import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ColorSpan from '../src/components/color_span';

describe("ColorSpan", ()=> {
  it('wraps inner HTML in a colored span', () => {

    const colorSpan = shallow(
      <ColorSpan color="blue">
        <div id="hello">Content</div>
      </ColorSpan>
    );

    expect(colorSpan.type()).toEqual('span')
    expect(colorSpan.props().style.color).toEqual("blue")
    expect(colorSpan.children().find("#hello").length).toEqual(1)
  });
})