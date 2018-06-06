export interface IUser {
  login: string;
  id: number;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  received_events_url: string;
  type: string;
  score: number;
}
export interface IUsersObject {
  total_count: number;
  items: IUser[];
}

export const UsersObject: IUsersObject = {
  total_count: 100,
  items: []
};

export interface IParams {
  page: number;
  perPage: number;
  sort: string;
  order: string;
  searchTerm: string;
  selected: string;
}

export const params: IParams = {
  page: 1,
  perPage: 10,
  sort: 'created',
  order: 'desc',
  searchTerm: 'github',
  selected: ''
};
