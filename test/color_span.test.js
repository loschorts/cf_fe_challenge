import React from 'react';
import { shallow, mount, render } from 'enzyme';

import ColorSpan from '../src/components/color_span';

describe("ColorSpan", ()=> {
  it('wraps inner HTML in a colored span', () => {

    const innerHTML = <div id="hello">Hello</div>
    const blueSpan = <span style={color: "blue"}/>
    const colorSpan = shallow(
      <ColorSpan color="blue">
        {innerHTML}
      </ColorSpan>
    );

    const html = `<span class="color-span" style="color:blue;"><div id="hello">Hello</div></span>`

    expect(colorSpan.matches(blueSpan)).toBe(true);

    expect(colorSpan.html()).toEqual(html);
  });
})