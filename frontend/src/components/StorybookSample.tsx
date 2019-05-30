/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';

const containerStyle = css`
  margin: 30px;
`;

const buttonStyle = css`
  border: 1px solid skyblue;
  color: skyblue;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 20px;

  :hover {
    background: skyblue;
    color: white;
  }
`;

const StorybookSmaple: FC<{}> = () => (
  <div css={containerStyle}>
    <button type="button" onClick={() => null} css={buttonStyle}>
      storybook!
    </button>
  </div>
);

export default StorybookSmaple;
