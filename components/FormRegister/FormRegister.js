import { Formik, Form, Field, ErrorMessage } from 'formik'
import Router from 'next/router'
import { setCookie } from 'nookies'
import { toast } from 'react-toastify'
import Schema from './Schema'
import fetch from 'isomorphic-unfetch'
const FormRegister = () => {

  async function onSubmit(values, actions) {
    const { API_URL } = process.env
    const register = await fetch(`${API_URL}/auth/local/register`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(r => {
      console.log(r);
      if (r.ok) {
        toast.success('Usuário cadastrado com sucesso!!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
      if (!r.ok) {
        toast.error('Nome e email em uso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return r.json()
    }).then(data => {
      if (data.jwt) {
        setCookie(null, 'jwt', data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        Router.push('/notes')
        return
      }
    })

  }
  return (
    <div>
      <p className='font-black mx-3 my-2 text-4xl'>Cadastro</p>
      <Formik
        validationSchema={Schema}
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className='m-3'>
            <div>
              <label className='block font-bold text-gray-600'>Nome</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='username' type='text' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='username' component='div' />
            </div>
            <div>
              <label className='block font-bold text-gray-600'>Email</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='email' type='text' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='email' component='div' />
            </div>
            <div>
              <label className='block font-bold text-gray-600'>Senha</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='password' type='password' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='password' component='div' />
            </div>
            <div>
              <label className='block font-bold text-gray-600'>Confirmar senha</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='passwordConfirmation' type='password' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='passwordConfirmation' component='div' />
            </div>
            <div className='flex justify-end'>
              <button className='bg-green-400 p-3 my-3 rounded-md font-bold text-white hover:bg-green-200 disabled:bg-green-200' type='submit' disabled={!props.isValid}>Cadastrar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormRegister