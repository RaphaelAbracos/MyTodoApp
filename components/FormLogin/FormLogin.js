import { Formik, Form, Field, ErrorMessage } from 'formik'
import schema from './Schema'
import { setCookie } from 'nookies'
import Link from 'next/link'
import Router from 'next/router'
import { toast } from 'react-toastify'
import fetch from 'isomorphic-unfetch'

const FormLogin = () => {
  async function onSubmit(values, actions) {
    const loginInfo = {
      identifier: values.email,
      password: values.password
    }
    const { API_URL } = process.env
    const login = await fetch(`${API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    }).then(r => {
      if (!r.ok) {
        toast.error('Usuário ou senha inválidos!', {
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
    }
    ).then(data => {
      if (data.jwt) {
        setCookie(null, 'jwt', data.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: '/',
        })
        Router.push('/notes')
        return
      }
    })
    actions.resetForm();
  }
  return (
    <div>
      <p className='font-black mx-3 my-2 text-4xl'>Login</p>
      <Formik
        validationSchema={schema}
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className='m-3'>
            <div>
              <label className='block font-bold text-gray-600'>Email</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='email' type='text' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' component='div' name='email' />
            </div>
            <div>
              <label className='block font-bold text-gray-600'>Senha</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1' name='password' type='password' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' component='div' name='password' />
            </div>
            <div className='flex justify-end space-x-2'>
              <button className='bg-gray-400 p-3 my-3 rounded-md font-bold text-white hover:bg-gray-200 disabled:bg-green-200' type='button'><Link href='/register'>Cadastrar</Link></button>
              <button className='bg-green-400 p-3 my-3 rounded-md font-bold text-white hover:bg-green-200 disabled:bg-green-200' type='submit' disabled={!props.isValid}>enviar</button>
            </div>
            {props.isSubmitting &&
              <div>
                CARREGANDO...
              </div>}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormLogin