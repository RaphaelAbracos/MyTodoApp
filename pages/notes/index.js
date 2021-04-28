import { destroyCookie, parseCookies } from "nookies"
import Link from 'next/link'
import { useRouter} from 'next/router'
const index = ({ notes }) => {
  const router = useRouter()
  const deleteNote = async (id) => {
    const jwt = parseCookies().jwt
    const { API_URL } = process.env
    const register = await fetch(`${API_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
      },
    })
    router.reload()
  }
  return (
    <div>
      {notes.map(note => (
        <div key={note.id} className='bg-gray-50 w-1/4 my-4 mx-auto p-2 rounded border hover:border-black cursor-pointer'>
          <p className='text-xl font-black'>{note.title}</p>
          <p className='text-lg'>{note.description}</p>
          <div className='flex justify-end space-x-1'>
            <Link href={`/notes/${note.id}`}>
              <img src="/EditNote.svg" className='w-9 hover:opacity-70 cursor-pointer bg-blue-400 p-1 rounded-md' />
            </Link>
            <button onClick={() => deleteNote(note.id)}>
              <img src="/DeleteNote.svg" className='w-9 hover:opacity-70 cursor-pointer bg-red-400 p-1 rounded-md' />
            </button>
          </div>
        </div>
      ))}
      <div className='fixed bottom-0 right-0'>
        <Link href='/notes/newNote'>
          <img src="/AddNote.svg" className='m-5 w-20 hover:opacity-70 cursor-pointer' />
        </Link>
      </div>
    </div>
  )
}
export const getServerSideProps = async (ctx) => {
  const jwt = parseCookies(ctx).jwt
  const users = await fetch(`${process.env.API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  const user = await users.json()
  const res = await fetch(`${process.env.API_URL}/notes?users_permissions_user._id=${user._id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  const notes = await res.json()
  return {
    props: {
      notes: notes
    }
  }
}
export default index