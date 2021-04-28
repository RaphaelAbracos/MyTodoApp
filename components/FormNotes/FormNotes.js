import { Formik, Form, Field, ErrorMessage } from 'formik'
import { parseCookies } from 'nookies'
import { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import Schema from '../FormNotes/Schema'
import { toast } from 'react-toastify'
import Link from 'next/link'

const FormNotes = () => {
  const { userId } = useContext(UserContext);
  const jwt = parseCookies().jwt
  async function onSubmit(values, actions) {
    const { API_URL } = process.env
    const notesData = {
      title: values.title,
      description: values.description,
      users_permissions_user: userId
    }
    const register = await fetch(`${API_URL}/notes`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(notesData)
    }).then(r => {
      if (r.ok) {
        toast.success('Lembrete cadastrado com sucesso!!', {
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
        toast.error('Ops! Alguma coisa deu errado', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    })
    actions.resetForm();
  }
  return (
    <div>
      <p className='font-black mx-3 my-2 text-4xl'>Cadastrar Lembrete</p>
      <Formik
        validationSchema={Schema}
        initialValues={{
          title: '',
          description: '',
        }}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form className='m-3'>
            <div>
              <label className='block font-bold text-gray-600'>Titulo</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='title' type='text' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='title' component='div' />
            </div>
            <div>
              <label className='block font-bold text-gray-600'>Descrição</label>
              <Field className='w-full border rounded-sm h-12 appearance-none focus:border-gray-400 focus:outline-none px-1 py-2' name='description' type='text' />
              <ErrorMessage className='block text-red-600 m-2 font-bold' name='description' component='div' />
            </div>
            <div className='flex justify-end space-x-3'>
              <button className='bg-gray-400 p-3 my-3 rounded-md font-bold text-white hover:opacity-70 disabled:bg-green-200'><Link href='/notes'>Cancelar</Link></button>
              <button className='bg-green-400 p-3 my-3 rounded-md font-bold text-white hover:bg-green-200 disabled:bg-green-200' type='submit' disabled={!props.isValid}>Cadastrar</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default FormNotes