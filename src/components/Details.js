import React from 'react';
import { CSVLink } from 'react-csv'

const Details = ({ details, user }) => {

	// export data to csv
	const csvData = [{
		username: user,
		"repository": details?.name,
		"forks": details?.forks_count,
		"starts": details?.stargazers_count,
	  }]

	return (
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
            <CSVLink className='bg-indigo-600 text-white py-2.5 px-5 rounded-md' data={csvData}>Download</CSVLink>
          </div>
        </div>
      </main>
	)
}

export default Details