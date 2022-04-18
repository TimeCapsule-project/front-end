import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={19} height={21} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.764 17.539 12.511 4.104l3.46 2.818L4.222 20.357l-3.198.27-.26-3.088ZM13.49 2.984 15.448.745l3.46 2.818-1.96 2.24-3.458-2.819Z"
      fill="silver"
    />
  </Svg>
);

export default SvgComponent;
