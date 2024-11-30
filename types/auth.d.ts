export interface LOGIN_PAYLOAD {
  email: string;
  password: string;
}
export interface REGISTER_USER_PAYLOAD {
  username?: string;
  email?: string;
  password: string;
  firstname: string;
  lastname: string;
}
