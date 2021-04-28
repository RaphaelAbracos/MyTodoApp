import { data } from "autoprefixer"
import { ErrorMessage, Field, Form, Formik } from "formik"
import Link from "next/link"
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import Schema from '../../components/FormNotes/Schema'

const editNotes = ({ id, data, jwt }) => {
  async function onSubmit(values, actions) {
    const { API_URL } = process.env
    const notesData = {
      title: values.title,
      description: values.description,
    }
    const register = await fetch(`${API_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
      body: JSON.stringify(notesData)
    }).then(r => {
      if (r.ok) {
        toast.success('Lembrete atualizado com sucesso!!', {
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
  }
  return (
    <div className='flex justify-center items-center text-xl min-h-screen'>
      <div className='h-full bg-gray-50 shadow-md w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5 sm:w-4/5 rounded-md'>
        <p className='font-black mx-3 my-2 text-4xl'>Editar Lembrete</p>
        <Formik
          validationSchema={Schema}
          initialValues={{
            title: data.title,
            description: data.description,
          }}
          onSubmit={onSubmit}
        >
          {(props) => {
            return (
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
                  <button className='bg-green-400 p-3 my-3 rounded-md font-bold text-white hover:opacity-70 disabled:bg-green-200' type='submit' disabled={!props.isValid}>Atualizar</button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}


export const getServerSideProps = async (context) => {
  const jwt = parseCookies(context).jwt
  const id = context.params.id
  const { API_URL } = process.env
  const res = await fetch(`${API_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  const data = await res.json();

  return {
    props: {
      id: id,
      data: data,
      jwt: jwt
    }
  }
}


export default editNotes