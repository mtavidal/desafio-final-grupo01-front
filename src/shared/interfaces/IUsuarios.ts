export interface Usuario {
  idpessoa: number;
  email: string;
  senha: string;
  nome: string;
  tipoUsuario: string;
}

export interface UsuarioResponse {
  id: number;
  email: string;
  password: string;
  name: string;
  type: string;
}
