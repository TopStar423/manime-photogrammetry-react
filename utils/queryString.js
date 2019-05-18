import { Storage } from 'aws-amplify';
import { setStorageBucket, setDefaultBucket } from '../components/Aws';

const IMAGE_KEY_MAP = new Map();
IMAGE_KEY_MAP.set('leftFingers', 0);
IMAGE_KEY_MAP.set('leftThumb', 1);
IMAGE_KEY_MAP.set('rightFingers', 2);
IMAGE_KEY_MAP.set('rightThumb', 3);
IMAGE_KEY_MAP.set('side', 4);
IMAGE_KEY_MAP.set('left_fingers', 0);
IMAGE_KEY_MAP.set('left_thumb', 1);
IMAGE_KEY_MAP.set('right_fingers', 2);
IMAGE_KEY_MAP.set('right_thumb', 3);

const listUserFiles = async identityId => {
  const result = await Storage.list(``, { level: 'private', identityId });
  return result;
}

const getLatestKeys = userFiles => {
  // listedKeys[0] == {key: leftFingers, lastModified: }... leftThumb, rightFingers, rightThumb, side
  let latestKeys = [{}, {}, {}, {}, {}];

  if (!Array.isArray(userFiles)) return listedKeys;

  userFiles.map(item => {
    const key = item.key;
    if (key) {
      // item.key is leftFingers.png -> _keyArray is [leftFingers, .png]
      const _keyArray = key.split('.');
      const fileName = _keyArray[0];

      // If it is a valid key, check for duplicates and if newer file, replace.
      if (IMAGE_KEY_MAP.has(fileName)) {
        const lastModified = item.lastModified.getTime();
        const index = IMAGE_KEY_MAP.get(fileName);

        if (!latestKeys[index] || !latestKeys[index].lastModified || lastModified > latestKeys[index].lastModified) {
          const newKey = { key, lastModified };
          latestKeys[index] = newKey;
        }
      }
    }
  });
  return latestKeys;
};

const getUserFile = async (s3Key, identityId) => {
  const result = await Storage.get(s3Key, { level: 'private', identityId }, { expires: 60 * 10 });
  return result;
}

const getLatestSignedUris = async (latestKeys, identityId) => {
  let signedUris = ['', '', '', '', ''];
  for (let i = 0; i < 5; ++i) {
    signedUris[i] = await getUserFile(latestKeys[i].key, identityId);
  }
  // latestKeys.map(async (item, i) => {
  //   const uri = await getUserFile(item.key, identityId);
  //   signedUris[i] = uri;
  // })
  return signedUris;
}

export const getSignedUriArray = async identityId => {
  setStorageBucket('mani-me-react-native-userfiles-1');
  const userFiles = await listUserFiles(identityId);
  const latestKeys = getLatestKeys(userFiles);
  const signedUris = await getLatestSignedUris(latestKeys, identityId);
  return signedUris;
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
