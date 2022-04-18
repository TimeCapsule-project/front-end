import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={24} height={23} fill="none">
    <Path
      d="M12.992 12a3 3 0 0 1 3 3l-.002 1.496c.206 3.674-2.624 5.506-7.87 5.506C2.892 22 0 20.194 0 16.55V15a3 3 0 0 1 3-3h9.992Zm8 0a3 3 0 0 1 3 3v1.054c.18 3.294-2.32 4.946-6.888 4.946-.62 0-1.204-.03-1.748-.09 1.072-.992 1.646-2.336 1.644-4.036l-.012-.434.004-1.44a3.983 3.983 0 0 0-1.356-3h5.356ZM8 0a5 5 0 1 1 0 10A5 5 0 0 1 8 0Zm10 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      fill="silver"
    />
  </Svg>
);

export default SvgComponent;
