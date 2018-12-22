import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Amplify from '../components/Aws';
import BoardBody from '../components/BoardBody';

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Data = (props) => (
  <Layout before={false}>
    <BoardBody {...props}></BoardBody>
  </Layout>
);


// <p>Index</p>
// <ul>
//   <PostLink id="hello" title="Hello"/>
//   <PostLink id="learn" title="Learn"/>
//   <PostLink id="deploy" title="Deploy"/>
// </ul>

// <h1>Shows</h1>
// <ul>
//   {props.shows.map(({show}) => (
//     <li key={show.id}>
//       <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
//         <a>{show.name}</a>
//       </Link>
//     </li>
//   ))}
// </ul>


Data.getInitialProps = async function(context) {
  const { id } = context.query;
  // console.log(`ID: ${id}`);
  return { id };
}

export default Data;
