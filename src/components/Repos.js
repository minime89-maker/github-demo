import React from 'react';
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import Details from './Details'
import { NavLink, useNavigate } from "react-router-dom";
import { debounce } from 'lodash'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Repos = () => {

	const [open, setOpen] = useState(false)
	const [user, setUser] = useState('')
	const [repo, setRepo] = useState([])
	const [details, setDetails] = useState()

	// display error message if user is not found
	const notify = () => toast.error("User not found", {
		position: "top-right",
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: false,
		draggable: true,
		progress: undefined,
	})
	const navigate = useNavigate()

	const handleChange = (e) => {
		setUser(e.target.value)
		handleSearch(e.target.value)
	}

	const getUserData = (user) => {
		axios.get(`https://api.github.com/users/${user}/repos`)
			.then(res => {
				//console.log(res.data)
				setRepo(res.data)
			})
			.catch(err => {
				// clean up 
				//console.log(err)
				notify()
				setUser('')
				setRepo('')
				setDetails('')
				navigate('/')
			})
	}

	// debounce
	const handleSearch = useMemo(() => debounce(getUserData, 1000), [])

	// cancel debounce
	useEffect(() => {
		return () => {
			handleSearch.cancel()
		}
	}, [])

	const getDetails = (name) => {
		axios.get(`https://api.github.com/repos/${user}/${name}`)
			.then(res => {
				//console.log(res.data)
				setDetails(res.data)
			})
			.catch(err => {
				return err
			})
	}

	// sidebar toggler to open and close
	const toggle = () => setOpen(!open)

	return (
		<div id='App'>
			<header className="flex items-center p-4 space-x-6 bg-white text-gray-500 shadow-sm md:space-x-0">
				<button onClick={toggle} className='md:hidden' aria-label="Toggle Sidebar" tabIndex='0'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
					</svg>
				</button>
				<form className='flex items-center justify-between w-full space-x-4' >
					<button aria-label='Search for user' tabIndex='0'>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</button>
					<input type="text"
						placeholder='Search'
						value={user}
						onChange={handleChange}
						className='w-full bg-transparent outline-none focus:border-gray-900'
						aria-label='Search for user'
						title='Search'
					/>
					<img src={repo[0]?.owner.avatar_url || 'https://uifaces.co/our-content/donated/N5PLzyan.jpg'} alt="User profile" width='32' height='32'
						className='rounded-full focus:border-gray-100' tabIndex='0' />
				</form>
			</header>

			<nav className={`bg-white p-4 ${open ? 'absolute top-0 min-h-screen w-10/12' : 'hidden'} md:block min-h-screen`} role='navigation'>
				<h2 className='text-3xl font-bold mb-6'>{repo[0]?.owner.login || 'octocat'}</h2>
				{repo && repo.map((val) => {
					return (

						<NavLink key={val.id} to={`/${val.owner.login}/${val.name}`} className={({ isActive }) => {
							return `block p-2 rounded-md ${isActive ? `bg-gray-100` : 'bg-white'} hover:bg-gray-100`
						}}
							onClick={() => getDetails(val.name)}
						>
							<button className='text-base leading-6 font-medium text-gray-600'>{val.name}</button>
						</NavLink>
					)
				})}
			</nav>

			{/* close */}
			<div className={`${open ? 'absolute right-0 top-0 p-6 min-h-screen bg-gray-700 opacity-70 w-1/6' : 'hidden'} md:hidden`}>
				<button onClick={toggle} className='text-white'>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<Details details={details} user={user} />
			<ToastContainer />

		</div>
	);
}

export default Repos;