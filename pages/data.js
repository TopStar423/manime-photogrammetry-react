import Link from 'next/link';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import BoardBody from '../components/BoardBody';

const Data = props => (
  <BoardBody {...props}></BoardBody>
);

Data.getInitialProps = async function(context) {
  const { id } = context.query;
  // console.log(`ID: ${id}`);
  return { id };
};

export default Data;
