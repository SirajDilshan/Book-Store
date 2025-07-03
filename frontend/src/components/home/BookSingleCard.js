import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle, BiShow } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';
import BookModel from '../home/BookModel';
import { useState } from 'react';

const BookSingleCard = ({book}) => {
   const [showModel, setShowModel] = useState(false);
  return (
    <div className='bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 m-4 relative'>
  {/* Publish Year Badge */}
  <h2 className='absolute top-3 right-4 bg-sky-100 text-sky-800 text-sm px-3 py-1 rounded-full font-semibold'>
    {book.publishYear}
  </h2>

  {/* Book ID */}
  {/* <p className='text-xs text-gray-400 mb-2'>ID: {book._id}</p> */}

  {/* Title */}
  <div className='flex items-center gap-2 mb-2'>
    <PiBookOpenTextLight className='text-sky-500 text-xl' />
    <h3 className='text-lg font-semibold text-gray-800'>{book.title}</h3>
  </div>

  {/* Author */}
  <div className='flex items-center gap-2 mb-2'>
    <BiUserCircle className='text-sky-500 text-xl' />
    <p className='text-gray-700'>{book.author}</p>
  </div>

  {/* Actions */}
  <div className='flex justify-between items-center mt-4 border-t pt-3'>
    <BiShow
      className='text-2xl text-blue-600 hover:text-blue-800 cursor-pointer'
      title="Quick View"
      onClick={() => setShowModel(true)}
    />
    <Link to={`/books/details/${book._id}`} title="Details">
      <BsInfoCircle className='text-2xl text-green-600 hover:text-green-800' />
    </Link>
    <Link to={`/books/edit/${book._id}`} title="Edit">
      <AiOutlineEdit className='text-2xl text-yellow-600 hover:text-yellow-800' />
    </Link>
    <Link to={`/books/delete/${book._id}`} title="Delete">
      <MdOutlineDelete className='text-2xl text-red-600 hover:text-red-800' />
    </Link>
  </div>

  {/* Modal */}
  {showModel && (
    <BookModel book={book} onClose={() => setShowModel(false)} />
  )}
</div>

  )
}

export default BookSingleCard;