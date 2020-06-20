import * as React from 'react';

const SvgButtonAudioForward = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 60 60' {...props}>
    <circle cx={30} cy={30} r={30} />
    <path
      d='M42 30a12 12 0 1 1-12-12h4.94'
      stroke='#999'
      strokeLinecap='round'
      strokeLinejoin='round'
      fill='none'
      strokeWidth={4}
    />
    <path
      fill='#999'
      strokeWidth={2}
      stroke='#999'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M39.63 18.23l-10-7.4v14.8l10-7.4z'
    />
  </svg>
);

export default SvgButtonAudioForward;
