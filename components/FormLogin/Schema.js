import * as Yup from 'yup';

export default Yup.object().shape({
  email: Yup.string().email('Insira um email valido').required('Email é um campo obrigatório'),
  password: Yup.string().required('Senha é um campo obrigatóro'),
});