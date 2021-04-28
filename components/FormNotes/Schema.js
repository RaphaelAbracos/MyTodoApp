import * as Yup from 'yup';

export default Yup.object().shape({
  title: Yup.string().max(20, 'Máximo de 20 caracteres').required('Titulo é um campo obrigatório'),
  description: Yup.string().max(80,'Máximo de 80 caracteres').required('Descrição é um campo obrigatório'),
});