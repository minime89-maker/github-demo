import { useState } from "react";
import axios from "axios";
import { CSVLink } from 'react-csv'

function App() {

  const [open, setOpen] = useState(false)
  const [user, setUser] = useState('')
  const [repo, setRepo] = useState([])
  const [details, setDetails] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.get(`https://api.github.com/users/${user}/repos`)
      .then(res => {
        console.log(res.data)
        setRepo(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getDetails = (name) => {
    axios.get(`https://api.github.com/repos/${user}/${name}`)
      .then(res => {
        console.log(res.data)
        setDetails(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const toggle = () => setOpen(!open)

  // export data to csv
  const csvData = [{
    username: user,
    "repository": details?.name,
    "forks": details?.forks_count,
    "starts": details?.stargazers_count,
  }]

  return (
    <div id="App">

      <header className="flex items-center p-4 space-x-6 bg-white text-gray-500 shadow-sm md:space-x-0">
        <button onClick={toggle} className='md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
        <form className='flex items-center justify-between w-full space-x-4' onSubmit={handleSubmit}>
          <button onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <input type="text"
            placeholder="Search"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className='w-full bg-transparent outline-none'
          />
          <img src={repo[0]?.owner.avatar_url || 'https://uifaces.co/our-content/donated/N5PLzyan.jpg'} alt="Profile" width='32'
            className='rounded-full' />
        </form>
      </header>

      <nav className={`bg-white p-4 ${open ? 'absolute top-0 min-h-screen w-10/12' : 'hidden'} md:block min-h-screen`}>
        <h2 className='text-3xl font-bold mb-6'>{repo[0]?.owner.login || 'octocat'}</h2>
        {repo && repo.map((val) => {
          return (
            <div key={val.id} className='hover:bg-gray-100 rounded-md p-2 cursor-pointer'
            onClick={() => getDetails(val.name)}
            >
             <p className='text-base leading-6 font-medium text-gray-600'>{val.name}</p>
            </div>
          )
        })}
      </nav>

      {/* close */}
      <div className={`${open ? 'absolute right-0 top-0 p-6 min-h-screen bg-gray-700 opacity-70 w-1/6' : 'hidden' } md:hidden`}>
        <button onClick={toggle} className='text-white'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <main>
        <div className="p-4 space-y-4 mt-4 md:flex md:flex-wrap md:space-x-4">
          <div className="md:pl-4 w-full">
            <h1 className="text-2xl leading-8 font-semibold">Details</h1>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 flex-1 md:w-1/2'>
            <p className='text-gray-500 text-sm leading-5 font-medium'>Forks</p>
            <h2 className='text-3xl leading-9 font-semibold'>{details?.forks_count}</h2>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 md:w-1/2'>
            <p className='text-gray-500 text-sm leading-5 font-medium'>Stars</p>
            <h2 className='text-3xl leading-9 font-semibold'>{details?.stargazers_count}</h2>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 md:w-full'>
            <h2 className='text-lg leading-6 font-medium text-gray-900'>Export</h2>
            <p className='text-sm leading-5 font-normal text-gray-500 mb-6'>Aktuelle Informationen herunterladen</p>
            <CSVLink className='bg-indigo-500 text-white py-2.5 px-5 rounded-md' data={csvData}>Download</CSVLink>
          </div>
        </div>
      </main>

    </div>
  );
}

export default App;
