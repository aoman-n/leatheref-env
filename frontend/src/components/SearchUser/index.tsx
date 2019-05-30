/** @jsx jsx */
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'semantic-ui-react';
import { jsx, css } from '@emotion/core';

import Form from '../../containers/SearchUser/Form';
import RandomUsers from '../../containers/common/RandomUsers';
import Layout from '../common/Layout';
import pages from '../../pages';

const form = css`
  margin-bottom: 30px;
`;

const links = css`
  margin-top: 20px;
`;

const SearchUser: FC = () => (
  <Layout>
    <h4>user検索</h4>
    <Form css={form} />
    <RandomUsers />
    <div css={links}>
      <List>
        <List.Header>もっとメンバーを追加</List.Header>
        <List.Item>
          <Link to={pages.organizations.path}>会社から検索</Link>
        </List.Item>
      </List>
      <Link to={pages.random.path}>
        <Button color="twitter">{pages.random.title}</Button>
      </Link>
    </div>
  </Layout>
);

export default SearchUser;
