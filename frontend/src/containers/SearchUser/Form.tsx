import React, { FC, FormEvent, useState, useEffect, useCallback } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { searchUser, SearchUserParams } from '../../actions/github';
import { addMember, AddMemberParams } from '../../actions/random';
import { RootStateType } from '../../reducers';
import { User } from '../../reducers/github';

import Form from '../../components/SearchUser/Form';

interface StateProps {
  searchedUsers: User[];
  isLoading: boolean;
}

interface DispatchProps {
  dispatchSearchUserStart: (params: SearchUserParams) => void;
  dispatchAddMember: (params: AddMemberParams) => void;
}

type EnhancedFormProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  searchedUsers: state.github.users,
  isLoading: state.github.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      dispatchSearchUserStart: params => searchUser.start(params),
      dispatchAddMember: params => addMember(params),
    },
    dispatch,
  );

/* custom hooks 参照: https://qiita.com/seya/items/4ef1ef643b4e5f63dd92 */
const useDebounce = (fn: () => any, ms: number = 0, args: any[] = []) => {
  useEffect(() => {
    const handle = setTimeout(fn.bind(null, args), ms);

    return () => {
      clearTimeout(handle);
    };
  }, args);
};

const useDebouncedQuery = (onChange: (query: string) => void) => {
  const [searchQuery, setSearchQuery] = useState('');

  useDebounce(
    () => {
      onChange(searchQuery);
    },
    500,
    [searchQuery],
  );

  const clearQuery = useCallback(() => {
    setSearchQuery('');
  }, []);

  return { searchQuery, setSearchQuery, clearQuery };
};
/* ここまで */

const SearchUserFormContainer: FC<EnhancedFormProps> = ({
  searchedUsers,
  isLoading,
  dispatchSearchUserStart,
  dispatchAddMember,
}) => {
  const loadSuggestions = (q: string) => {
    if (q) {
      dispatchSearchUserStart({ q });
    }
  };

  const { searchQuery, setSearchQuery } = useDebouncedQuery(loadSuggestions);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
      const user = searchedUsers.find(u => u.login === searchQuery);
      if (user) dispatchAddMember({ user });
    }
  };

  return (
    <Form
      {...{
        searchedUsers,
        isLoading,
        searchQuery,
        setSearchQuery,
        handleSubmit,
      }}
    />
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUserFormContainer);
