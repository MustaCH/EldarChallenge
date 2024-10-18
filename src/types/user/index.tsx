export interface UserState {
  isAuthorized: boolean;
  role: string | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  password?: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  state: UserState;
}
