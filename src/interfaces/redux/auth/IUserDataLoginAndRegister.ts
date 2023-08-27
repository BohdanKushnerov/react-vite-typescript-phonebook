export default interface IUserDataLoginAndRegister {
  token: string;
  user: {
    name: string;
    email: string;
  };
}
