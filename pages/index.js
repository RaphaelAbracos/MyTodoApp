import FormLogin from "../components/FormLogin/FormLogin";
export default function Home() {
  return (
    <div className='flex justify-center items-center text-xl min-h-screen'>
      <div className='h-full bg-gray-50 shadow-md w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/5 sm:w-4/5 rounded-md'>
        <FormLogin></FormLogin>
      </div>
    </div>
  )
}
