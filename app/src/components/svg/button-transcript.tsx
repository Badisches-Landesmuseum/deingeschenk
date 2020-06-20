import * as React from 'react';

/* tslint:disable */
const SvgButtonTranscript = (props: React.SVGProps<SVGSVGElement>) => (
  <svg id='button-transcript_svg__working' viewBox='0 0 80 72' {...props}>
    <defs>
      <style>
        {
          '.button-transcript_svg__cls-3{stroke-linecap:round;stroke-linejoin:round;fill:none;stroke:#999;stroke-width:4px}'
        }
      </style>
    </defs>
    <g opacity={0.7}>
      <rect width={80} height={60} rx={5.38} />
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='#000'
        strokeWidth={2}
        d='M20 46.67V70l20-23.33H20z'
      />
      <path
        className='button-transcript_svg__cls-3'
        d='M10 50h20M40 50h30M10 38.33h10M30 38.33h20M60 38.33h10'
      />
    </g>
  </svg>
);
/* tslint:enable */

export default SvgButtonTranscript;

