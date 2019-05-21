import React from 'react';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import { rotateImage } from '../utils/lambdaFunctions';

export default class Rotate extends React.Component {
  constructor(props) {
    super(props);
  }

  rotateImage = async () => {
    const fileName = 'leftFingers.png';
    const angle = 90;
    const identityId = 'us-west-2:77ab69f9-7829-4873-9f4a-5dc330af652a';
    await rotateImage(identityId, angle, fileName);
    // refresh image
  }

  render() {

    return (
      <Box position='absolute' width='100%' height='100%' display='flex' justifyContent='center' alignItems='center' bg='rgba(0,0,0,0.7)' onClick={this.props.onClick}>
        <Box width={500} bg='#ffffff' display='flex' flexDirection='row' flexWrap='wrap' zIndex={100}>
          {
            this.props.signedUriArray.map(uri => (
              <Box flex='0 1 50%' pt='50%' border='0.5px solid #000000' position='relative' style={{ boxSizing: 'border-box' }}>
                <Box position='absolute' width='100%' height='100%' top='0'>
                  <img src={uri} style={{ maxWidth: '100%', maxHeight: '100%' }}/>
                </Box>
                <Box width='100%' display='flex' flexDirection='row' justifyContent='center' mb={2}>
                  <StandardButton>Rotate</StandardButton>
                </Box>

              </Box>
            ))
          }
        </Box>
      </Box>
    );
  }
}

{/* <img src={uri} style={{ width: '100%' }}/>
<StandardButton></StandardButton> */}
