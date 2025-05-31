export interface IAppUser {
  userId: string;
  username: string;
  password: string;
  roles: string[];  // tableau de noms de rôles comme ['ROLE_ADMIN', 'ROLE_USER']
}
