/** @jsx jsx */
import { FC, ReactNode } from 'react';
import { jsx, css } from '@emotion/core';
import HtmlTitle from './HtmlTitle';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const container = css`
  padding: 16px 24px;
`;

const Layout: FC<LayoutProps> = ({ title = 'randomers', children }) => (
  <div css={container}>
    <HtmlTitle title={title} />
    {children}
  </div>
);

export default Layout;
