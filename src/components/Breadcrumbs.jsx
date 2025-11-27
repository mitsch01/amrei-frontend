import React from 'react'
import { Link } from 'react-router-dom'

export const Breadcrumbs = ({ articleTitle }) => {
  return (
    <nav className="text-md text-gray-800 mb-8">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/" className="text-[#0D0D0D]-800 hover:underline">
            Home
          </Link>
          <span className="mx-2">{'>'}</span>
        </li>
        {articleTitle && (
          <li className="flex items-center">
            <span className="text-[#0D0D0D]-800">{articleTitle}</span>
          </li>
        )}
      </ol>
    </nav>
  )
}
