import styled from 'styled-components';

interface GradientProps {
  position: 'top' | 'bottom';
  size: 'small' | 'big';
}

const Gradient = styled.div<GradientProps>`
  background: rgb(0,0,0); /* fallback */
  background: ${(props) => props.size === 'small'
    ? `linear-gradient(180deg,rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 24%, rgba(0,0,0,0) 99%, transparent);`
    : `linear-gradient(180deg,rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 30%, rgba(0,0,0,0) 99%, transparent);`
  };
  z-index: 1;
  position: absolute;
  left: 0;
  width: 100%;
  top: ${(props) => props.position === 'top' ? 0 : 'auto'};
  bottom: ${(props) => props.position === 'bottom' ?
                            props.size === 'small' ? '-2vmin'
                          : props.size === 'big'   ? '-20vmin'
                          : 'auto'
                       : 'auto'
  };
  height: ${(props) => props.size === 'small' ? '2vmin'
                     : props.size === 'big'   ? '20vmin'
                     : 'auto'
  };
`;

export {
  Gradient,
};
