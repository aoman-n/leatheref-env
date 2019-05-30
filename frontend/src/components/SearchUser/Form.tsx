/** @jsx jsx */
import { FC, Dispatch, FormEvent } from 'react';
import { jsx, css } from '@emotion/core';
import { Input, Button } from 'semantic-ui-react';

import { User } from '../../reducers/github';

export interface SearchUserFormProps {
  searchedUsers: User[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const form = css`
  margin-bottom: 40px;
`;

const input = css`
  margin-right: 16px !important;
`;

const Form: FC<SearchUserFormProps> = ({
  searchedUsers,
  isLoading,
  searchQuery,
  setSearchQuery,
  handleSubmit,
}) => {
  return (
    <form css={form} onSubmit={handleSubmit}>
      <Input
        css={input}
        placeholder="Search..."
        value={searchQuery}
        list="users"
        onChange={(e, data) => setSearchQuery(String(data.value))}
      />
      <datalist id="users">
        {searchedUsers.map(user => (
          <option key={user.id} value={user.login} />
        ))}
      </datalist>
      <Button
        type="submit"
        primary
        disabled={
          !searchQuery.length ||
          isLoading ||
          !searchedUsers.some(u => u.login === searchQuery)
        }
        loading={isLoading}
      >
        追加
      </Button>
    </form>
  );
};

export default Form;
