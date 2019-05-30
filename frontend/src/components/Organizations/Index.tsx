/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import Members from 'containers/Organizations/Members';
import Form from 'containers/Organizations/Form';
import Layout from '../common/Layout';

const Organizations: FC = () => (
  <Layout>
    <Form />
    <Members />
  </Layout>
);

export default Organizations;
