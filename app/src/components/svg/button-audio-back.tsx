import * as React from 'react';

const SvgButtonAudioBack = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 60 60' {...props}>
    <circle cx={30} cy={30} r={30} />
    <path
      d='M18 30a12 12 0 1 0 12-12h-4.94'
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
      d='M20.37 18.23l10-7.4v14.8l-10-7.4z'
    />
  </svg>
);

export default SvgButtonAudioBack;
