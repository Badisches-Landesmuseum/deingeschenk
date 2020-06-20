import * as React from 'react';

/* tslint:disable */
const SvgButtonAudioSkip = (props: React.SVGProps<SVGSVGElement>) => (
  <svg id='button-audio-skip_svg__working' viewBox='0 0 60 60' {...props}>
    <defs>
      <style>
        {
          '.button-audio-skip_svg__cls-1{fill:#999;stroke:#999;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px}'
        }
      </style>
    </defs>
    <circle cx={30} cy={30} r={30} />
    <path
      className='button-audio-skip_svg__cls-1'
      d='M28.14 30.14l-13.83 7.95V22.18l13.83 7.96zM42.65 29.86l-13.83 7.96V21.91l13.83 7.95zM43.01 21.91h2.43v16.18h-2.43z'
    />
  </svg>
);

export default SvgButtonAudioSkip;
/* tslint:enable */
