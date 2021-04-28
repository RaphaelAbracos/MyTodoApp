import * as Yup from 'yup';

export default Yup.object().shape({
  username: Yup.string().min(4, 'Nome inválido').required('Nome é um campo obrigatório'),
  email: Yup.string().email('Insira um e-mail valido').required('E-mail é um campo obrigatório'),
  password: Yup.string().min(6, 'Senha muito fraca').required('Senha é um campo obrigatóro'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Senhas precisam ser iguais').required('Confirmar senha é um campo obrigatório'),
});