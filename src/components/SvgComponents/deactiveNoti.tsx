import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const SvgComponent = () => (
  <Svg width={23} height={27} fill="none">
    <Path
      d="M21.667 21.92 5.453 5.187 2.027 1.653.333 3.347 4.067 7.08v.013C3.373 8.413 3 9.973 3 11.653v6.667L.333 20.987v1.333H18.64l2.667 2.667L23 23.293l-1.333-1.373ZM11 26.333a2.657 2.657 0 0 0 2.667-2.666H8.333A2.657 2.657 0 0 0 11 26.333Zm8-9.76v-4.906c0-4.107-2.187-7.52-6-8.427v-.907c0-1.106-.893-2-2-2s-2 .894-2 2v.907c-.2.04-.387.107-.56.16-.133.04-.267.093-.4.147h-.013c-.014 0-.014 0-.027.013-.307.12-.613.267-.907.413 0 0-.013 0-.013.014L19 16.573Z"
      fill="#F8F8F8"
    />
  </Svg>
);

export default SvgComponent;
