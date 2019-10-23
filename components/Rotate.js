import React from 'react';
import Box from './Box';
import { StandardButton, StandardInput } from './StyledComponents';
import { rotateImage, updateUserColumn, readUser } from '../utils/lambdaFunctions';
import { KEY_MAP, getUserFile } from '../utils/queryString';
import uuid from 'uuid';
import axios from 'axios';

export default class Rotate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      '0': false,
      '1': false,
      '2': false,
      '3': false,
      '4': false
    };
  }

  componentDidMount() {
    this.getUserData();









  }

  generateAutoModel = () => {
    console.log(this.props.signedUriArray);
    const signedUriArray = ((this || {}).props || {}).signedUriArray || [];

    const imageFilesPromiseArray = [];

    for (var i = 0; i < signedUriArray.length; i++) {
      const imageFilePromise = new Promise(function(resolve, reject) {
        let blob = null;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", signedUriArray[i]);
        xhr.responseType = "blob";
        xhr.onload = function()
        {
          blob = xhr.response;//xhr.response is now a blob object
          blob.lastModifiedDate = new Date();
          blob.name = 'leftFingers.jpg';
          resolve(blob);
        }
        xhr.send();
      });
      imageFilesPromiseArray.push(imageFilePromise);
    }

    Promise.all(imageFilesPromiseArray)
      .then(result => {

        var bodyFormData = new FormData();
        bodyFormData.append('LT', result[1]);
        bodyFormData.append('RT', result[3]);
        bodyFormData.append('4L', result[0]);
        bodyFormData.append('4R', result[2]);
        bodyFormData.append('uid', this.props.measure);
        bodyFormData.append('resend', 1);
        axios({
          method: 'post',
          url: `https://ml.manime.co/json`,
          config: { headers: { 'Content-Type': 'multipart/form-data' }},
          data: bodyFormData
        }).then(result => {
          console.log(result);
        })

      })
      .catch(err => console.log(err));
  }

  getUserData = async () => {
    const result = await readUser(this.props.measure);
    const userObject = result && result.rows && Array.isArray(result.rows) && result.rows.length > 0 ?
      result.rows[0] : null
    if (userObject) {
      const {
        statusleftfingers,
        statusleftthumb,
        statusrightfingers,
        statusrightthumb,
        statusside,
        versionleftfingers,
        versionleftthumb,
        versionrightfingers,
        versionrightthumb,
        versionside
      } = userObject;

      this.setState({
        statusLeftFingers: statusleftfingers,
        statusLeftThumb: statusleftthumb,
        statusRightFingers: statusrightfingers,
        statusRightThumb: statusrightthumb,
        statusSide: statusside,
        versionLeftFingers: versionleftfingers,
        versionLeftThumb: versionleftthumb,
        versionRightFingers: versionrightfingers,
        versionRightThumb: versionrightthumb,
        versionSide: versionside
      })
    }
  }

  rotateImageWrapper = async (key, angle, index) => {
    this.setState({ [index]: true });
    await rotateImage(this.props.measure, angle, key);
    this.props.openWorkbench();
    this.setState({ [index]: false });
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
    win.focus();

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

  setStatus = async (index, imageStatus) => {
    const columnName = KEY_MAP[index].statusLower;
    const userId = this.props.measure;
    await updateUserColumn(userId, columnName, imageStatus);
    this.getUserData();
  }

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
              pt='20vh'
              border='0.5px solid #000000'
              position='relative'
              style={{ boxSizing: 'border-box' }}>
              <Box position='absolute' width='100%' height='100%' top='0' zIndex={-100}>
                <img src={uri} style={{ maxWidth: '100%', maxHeight: '100%' }} />
              </Box>


              <Box position='absolute' top='0' right='0' display='flex' flexDirection='column' alignItems='flex-end'>
                <div>Current Status: {this.state[KEY_MAP[index].statusCamel] ? 'valid' : 'invalid'}</div>
                <div>Current Version: {this.state[KEY_MAP[index].versionCamel]}</div>
                <StandardButton
                  backgroundColor={this.state[KEY_MAP[index].statusCamel] ? 'gray' : 'green'}
                  onClick={() => this.setStatus(index, true)}>
                  Valid
                </StandardButton>
                <StandardButton
                  backgroundColor={this.state[KEY_MAP[index].statusCamel] ? 'red' : 'gray'}
                  onClick={() => this.setStatus(index, false)}>
                  Invalid
                </StandardButton>
              </Box>



              <Box
                width='100%'
                display='flex'
                flexDirection='row'
                justifyContent='space-evenly'
                mb={2}>
                <StandardButton
                  disabled={this.state[index] == true}
                  onClick={() => this.rotateImageWrapper(this.props.latestKeys[index].key, 90, index)}>
                  Rotate Left
                </StandardButton>
                <StandardButton
                  disabled={this.state[index] == true}
                  onClick={() => this.rotateImageWrapper(this.props.latestKeys[index].key, -90, index)}>
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
          <Box
            width='100%'
            display='flex'
            flexDirection='row'
            justifyContent='center'
            mb={2}
            mt={2}>
            <StandardButton onClick={this.generateAutoModel}>Generate ML/CV Model</StandardButton>
          </Box>
        </Box>
      </Box>
    );
  }
}
