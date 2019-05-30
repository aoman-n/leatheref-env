/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import Layout from './Layout';

const NotFound: FC = () => (
  <Layout>
    <h3>Not Found Page ...</h3>
    <Link to="/" />
  </Layout>
);

export default NotFound;
