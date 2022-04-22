import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={20} height={20} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m19.671 18.094-3.776-3.765a8.797 8.797 0 0 0 1.877-5.443 8.886 8.886 0 1 0-8.886 8.886 8.797 8.797 0 0 0 5.443-1.877l3.765 3.776a1.11 1.11 0 0 0 1.577 0 1.11 1.11 0 0 0 0-1.577ZM2.221 8.886a6.665 6.665 0 1 1 13.33 0 6.665 6.665 0 0 1-13.33 0Z"
      fill="silver"
    />
  </Svg>
);

export default SvgComponent;
