import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={26} height={26} fill="none">
    <Path
      d="m9.75 4.875.813-3.25h4.874l.813 3.25m6.5 0H4.875l1.625 19.5h13l1.625-19.5H3.25h19.5ZM13 9.75v9.75-9.75Zm4.063 0-.813 9.75.813-9.75Zm-8.125 0 .812 9.75-.813-9.75Z"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SvgComponent;
