import axios from 'axios';
import qs from 'qs';
import { User } from './models';
import { User as FormatedUser } from '../../reducers/github';

interface ApiConfig {
  baseURL: string;
  timeout: number;
}

const DEFAULT_CONFIG: ApiConfig = {
  baseURL: 'https://api.github.com',
  timeout: 7000,
};

export const getMembersFactory = (optionConfig: Partial<ApiConfig> = {}) => {
  const config: ApiConfig = {
    ...DEFAULT_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const getMembers = async (organizationName: string) => {
    try {
      const response = await instance.get(`/orgs/${organizationName}/members`);
      if (response.status !== 200) {
        throw new Error('Server Error');
      }

      const users: FormatedUser[] = response.data.map((user: User) => ({
        id: user.id,
        login: user.login,
        avatarUrl: user.avatar_url,
      }));

      return users;
    } catch (err) {
      throw err;
    }
  };

  return getMembers;
};

export const searchUserFactory = (optionConfig: Partial<ApiConfig> = {}) => {
  const config: ApiConfig = {
    ...DEFAULT_CONFIG,
    ...optionConfig,
  };

  const instance = axios.create(config);

  const searchUser = async (q: string) => {
    try {
      const params = qs.stringify({ q });
      const response = await instance.get(`/search/users?${params}`);
      if (response.status !== 200) {
        throw new Error('Server Error');
      }
      const users: FormatedUser[] = response.data.items.map((user: User) => ({
        id: user.id,
        login: user.login,
        avatarUrl: user.avatar_url,
      }));

      return users;
    } catch (err) {
      throw err;
    }
  };

  return searchUser;
};
