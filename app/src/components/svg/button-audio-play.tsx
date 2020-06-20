import * as React from 'react';

const SvgButtonAudioPlay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 100 100' {...props}>
    <circle cx={50} cy={50} r={50} />
    <path
      fill='#fff'
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={4}
      d='M69.8 50l-32-22v44l32-22z'
    />
  </svg>
);

export default SvgButtonAudioPlay;
