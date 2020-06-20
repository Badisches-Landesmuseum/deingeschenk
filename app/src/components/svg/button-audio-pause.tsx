import * as React from 'react';

const SvgButtonAudioPause = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    id='button-audio-pause_svg__working'
    viewBox='0 0 100 100'
    {...props}
  >
    <defs>
      <style>
        {
          // tslint:disable-next-line
          '.button-audio-pause_svg__cls-1{fill:#fff;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:4px}'}
      </style>
    </defs>
    <circle cx={50} cy={50} r={50} />
    <path
      className='button-audio-pause_svg__cls-1'
      d='M34 28h10v44H34zM56 28h10v44H56z'
    />
  </svg>
);

export default SvgButtonAudioPause;
