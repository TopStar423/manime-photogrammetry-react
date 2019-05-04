import { Storage } from 'aws-amplify';
import { setStorageBucket, setDefaultBucket } from '../components/Aws';

const listUserFiles = async identityId => {
  const result = await Storage.list(``, { level: 'private', identityId });
  return result;
}


const getUserFile = async s3Key => {
  const result = await Storage.get(key, { level: 'private' }, { expires: 60 * 10 });
  return result;
}

export const getQueryString = async identityId => {
  setStorageBucket('mani-me-react-native-userfiles-1');
  let queryString = '';
  const userFiles = await listUserFiles(identityId);
  userFiles.map(item => {
    console.log(item.key);
  })
  setDefaultBucket();
}



  // if (checkS3Exists($s3, $bucket, $userid, "leftFingers.jpg") == true)
  //   $queryString .= "&image0=".urlencode(getS3Presigned($s3, $bucket, $userid, "leftFingers.jpg"));
  // else if (checkS3Exists($s3, $bucket, $userid, "left_fingers.png") == true)
  //   $queryString .= "&image0=".urlencode(getS3Presigned($s3, $bucket, $userid, "left_fingers.png"));
  // else
  //   $queryString .= "&image0=".urlencode(getS3Presigned($s3, $bucket, $userid, "leftFingers.png"));
  //
  // if (checkS3Exists($s3, $bucket, $userid, "leftThumb.jpg") == true)
  //   $queryString .= "&image1=".urlencode(getS3Presigned($s3, $bucket, $userid, "leftThumb.jpg"));
  // else if (checkS3Exists($s3, $bucket, $userid, "left_thumb.png") == true)
  //   $queryString .= "&image1=".urlencode(getS3Presigned($s3, $bucket, $userid, "left_thumb.png"));
  // else
  //   $queryString .= "&image1=".urlencode(getS3Presigned($s3, $bucket, $userid, "leftThumb.png"));
  //
  // if (checkS3Exists($s3, $bucket, $userid, "rightFingers.jpg") == true)
  //   $queryString .= "&image2=".urlencode(getS3Presigned($s3, $bucket, $userid, "rightFingers.jpg"));
  // else if (checkS3Exists($s3, $bucket, $userid, "right_fingers.png") == true)
  //   $queryString .= "&image2=".urlencode(getS3Presigned($s3, $bucket, $userid, "right_fingers.png"));
  // else
  //   $queryString .= "&image2=".urlencode(getS3Presigned($s3, $bucket, $userid, "rightFingers.png"));
  //
  // if (checkS3Exists($s3, $bucket, $userid, "rightThumb.jpg") == true)
  //   $queryString .= "&image3=".urlencode(getS3Presigned($s3, $bucket, $userid, "rightThumb.jpg"));
  // else if (checkS3Exists($s3, $bucket, $userid, "right_thumb.png") == true)
  //   $queryString .= "&image3=".urlencode(getS3Presigned($s3, $bucket, $userid, "right_thumb.png"));
  // else
  //   $queryString .= "&image3=".urlencode(getS3Presigned($s3, $bucket, $userid, "rightThumb.png"));
  //
  // if (checkS3Exists($s3, $bucket, $userid, "side.jpg") == true)
  //   $queryString .= "&image4=".urlencode(getS3Presigned($s3, $bucket, $userid, "side.jpg"));
  // else
  //   $queryString .= "&image4=".urlencode(getS3Presigned($s3, $bucket, $userid, "side.png"));
