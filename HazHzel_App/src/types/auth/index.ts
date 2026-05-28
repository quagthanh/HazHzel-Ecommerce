export type checkCodeDTO = {
  _id: string;
  code: string;
};
export type retryActiveDTO = {
  email: string;
};
export type registerDTO = {
  name: string;
  email: string;
  password: string;
};
export type loginDTO = {
  username: string;
  password: string;
};
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}
