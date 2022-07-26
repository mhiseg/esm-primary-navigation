export interface LoggedInUser {
  uuid: string;
  username: string;
  userProperties: any;
  person: {
    display: string;
  };
}

export interface UserSession {
  sessionLocation?: {
    display: string;
  };
}

export interface User {
  display: string;
  link: Array<string>;
  person: any;
  priviliges: any;
  resourceVersion: any;
  roles: Array<any>;
  userProperties: any;
  username: string;
  uuid: string;
}