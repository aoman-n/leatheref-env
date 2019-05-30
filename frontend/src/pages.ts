/*
type PageScheme =
  | {
      path: string;
      title: string;
    }
  | Pages;
interface Pages {
  [x: string]: PageScheme;
}
*/

const pages = {
  top: {
    path: '/',
    title: 'Github APIを使ったアプリケーション',
  },
  organizations: {
    path: '/organization/search',
    title: '会社検索',
  },
  users: {
    path: '/users/search',
    title: 'ユーザーID検索',
  },
  confirmation: {
    path: '/confirmation',
    title: '追加したユーザーの一覧を確認',
  },
  random: {
    path: '/random',
    title: 'ランダムの実行',
  },
};

export default pages;
