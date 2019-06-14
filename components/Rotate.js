import React from 'react';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import { rotateImage } from '../utils/lambdaFunctions';
import uuid from 'uuid';

export default class Rotate extends React.Component {
  constructor(props) {
    super(props);
  }

  rotateImage = async (key, angle) => {
    await rotateImage(this.props.measure, angle, key);
    this.props.openWorkbench();
  };

  openWorkbench = () => {
    const { signedUriArray, measure, email } = this.props;
    const uri = `http://52.27.72.157/_v4G/workbench/mmw.php?measure=${measure}&user=${email}&nailLength=3&shape=square&texture=test`;

    const currentWindow = uuid.v1();

    var form = document.createElement('form');
    form.target = currentWindow;
    form.method = 'POST';
    form.action = uri;

    const keys = ['leftFingers', 'leftThumb', 'rightFingers', 'rightThumb', 'side'];
    keys.map((key, i) => {
      var input = document.createElement('input');
      input.type = 'text';
      input.name = key;
      input.value = signedUriArray[i];
      form.appendChild(input);
      document.body.appendChild(form);
    });

    var win = window.open('', currentWindow);
    // var win = window.open(uri, '_target');
    win.focus();

    // const images = {
    //   image0: signedUriArray[0],
    //   image1: signedUriArray[1],
    //   image2: signedUriArray[2],
    //   image3: signedUriArray[3],
    //   image4: signedUriArray[4]
    // };
    //
    // for (var i = 0; i < 10; ++i) {
    //   setTimeout(() => {
    //     win.postMessage(images, '*');
    //   }, 1000 * i);
    // }
    if (win) {
      form.submit();
    } else {
      alert('You must allow popups for this map to work.');
    }
  };

  onClick = e => {
    if (this.modal.contains(e.target)) return;
    else this.props.onClick();
  };

  render() {
    return (
      <Box
        position='absolute'
        width='100%'
        height='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
        bg='rgba(0,0,0,0.7)'
        onClick={this.onClick}>
        <Box
          ref={ref => (this.modal = ref)}
          width={500}
          bg='#ffffff'
          display='flex'
          flexDirection='row'
          flexWrap='wrap'
          zIndex={100}>
          {this.props.signedUriArray.map((uri, index) => (
            <Box
              flex='0 1 50%'
              pt='50%'
              border='0.5px solid #000000'
              position='relative'
              style={{ boxSizing: 'border-box' }}>
              <Box position='absolute' width='100%' height='100%' top='0' zIndex={-100}>
                <img src={uri} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Box>
              <Box
                width='100%'
                display='flex'
                flexDirection='row'
                justifyContent='space-evenly'
                mb={2}>
                <StandardButton
                  onClick={() => this.rotateImage(this.props.latestKeys[index].key, 90)}>
                  Rotate Left
                </StandardButton>
                <StandardButton
                  onClick={() => this.rotateImage(this.props.latestKeys[index].key, -90)}>
                  Rotate Right
                </StandardButton>
              </Box>
            </Box>
          ))}
          <Box
            width='100%'
            display='flex'
            flexDirection='row'
            justifyContent='center'
            mb={2}
            mt={2}>
            <StandardButton onClick={this.openWorkbench}>Open Workbench</StandardButton>
          </Box>
        </Box>
      </Box>
    );
  }
}
