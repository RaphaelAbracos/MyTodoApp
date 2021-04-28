import Image from 'next/image'
import { useRouter } from 'next/router'
import { destroyCookie } from 'nookies'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import Link from 'next/link'
const Navbar = () => {
  const router = useRouter()

  function logout() {
    destroyCookie(null, 'jwt')
    router.reload()
  }
  const { userName } = useContext(UserContext)
  return (
    <nav className='bg-gray-700 rounded-b-sm'>
      <div className='flex justify-between w-4/5 mx-auto p-2'>
        <div className='flex items-center space-x-1 ml-4 text-white'>
          <div>
            <Image
              src='/logo.svg'
              width={35}
              height={35}
            />
          </div>
          {userName &&
            <Link href='/notes'>
              <div className='font-bold text-xl cursor-pointer'>
                MyTodo
           </div>
            </Link>
          }
          {!userName &&
            <div className='font-bold text-xl'>
              MyTodo
            </div>
          }
        </div>
        <div className='flex items-center space-x-1 mr-4 text-white font-bold text-xl'>
          {!userName &&
            <div className='hover:bg-gray-500 p-1 rounded-sm cursor-pointer'><Link href='/'>Entrar</Link></div>
          }
          {userName &&
            <div className='p-1 font-semibold'>Bem vindo <strong className='font-bold'>{userName}</strong></div>
          }
          {userName &&
            <button type='button' onClick={logout} className='hover:bg-gray-500 p-1 rounded-sm cursor-pointer text-red-600'>Sair</button>
          }
        </div>
      </div>
    </nav>
  )
}

export default Navbar