import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Amplify from '../components/Aws.js';
// import { withAuthenticator } from 'aws-amplify-react';

const PostLink = (props) => (
  <li>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = (props) => (
  <Layout before={false}>
    <p>Index</p>
    <ul>
      <PostLink id="hello" title="Hello"/>
      <PostLink id="learn" title="Learn"/>
      <PostLink id="deploy" title="Deploy"/>
    </ul>
  </Layout>
);

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


Index.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data
  };
}

export default Index;
