import React from 'react';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import { rotateImage } from '../utils/lambdaFunctions';

export default class Rotate extends React.Component {
  constructor(props) {
    super(props);
  }

  rotateImage = async key => {
    const angle = 90;
    await rotateImage(this.props.measure, angle, key);
    // refresh image
  }

  render() {
    return (
      <Box position='absolute' width='100%' height='100%' display='flex' justifyContent='center' alignItems='center' bg='rgba(0,0,0,0.7)'>
        <Box width={500} bg='#ffffff' display='flex' flexDirection='row' flexWrap='wrap' zIndex={100}>
          {
            this.props.signedUriArray.map((uri, index) => (
              <Box flex='0 1 50%' pt='50%' border='0.5px solid #000000' position='relative' style={{ boxSizing: 'border-box' }}>
                <Box position='absolute' width='100%' height='100%' top='0' zIndex={-100}>
                  <img src={uri} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                </Box>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='center' mb={2}>
                  <StandardButton onClick={() => this.rotateImage(this.props.latestKeys[index].key)}>Rotate</StandardButton>
                </Box>
              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}
