/** @jsx jsx */
import { FC, FormEvent } from 'react';
import { jsx, css } from '@emotion/core';
import { Input, Button } from 'semantic-ui-react';

export interface OrganizationFormProps {
  handleChange?: (newValue: string) => void;
  handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  value?: string;
  isLoading?: boolean;
}

const input = css`
  margin-right: 16px !important;
`;

const Form: FC<OrganizationFormProps> = ({
  handleChange = () => {},
  handleSubmit = () => {},
  value = '',
  isLoading = false,
}) => {
  return (
    <div>
      <h3>Githubから検索: 会社名を入力してください。</h3>
      <form onSubmit={handleSubmit}>
        <Input
          id="organizationName"
          css={input}
          placeholder="Search..."
          value={value}
          onChange={(e, data) => handleChange(String(data.value))}
        />
        <Button
          type="submit"
          primary
          disabled={!value.length || isLoading}
          loading={isLoading}
        >
          検索
        </Button>
      </form>
    </div>
  );
};

export default Form;
