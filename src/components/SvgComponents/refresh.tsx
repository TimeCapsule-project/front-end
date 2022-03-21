import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={26} height={26} fill="none">
    <Path
      d="M13 0C9 0 5.4 1.8 3 4.7V1H1v8h8V7H3.8c2-3 5.3-5 9.2-5 6.1 0 11 4.9 11 11s-4.9 11-11 11S2 19.1 2 13H0c0 7.2 5.8 13 13 13s13-5.8 13-13S20.2 0 13 0Z"
      fill="#F8F8F8"
    />
  </Svg>
);

export default SvgComponent;
