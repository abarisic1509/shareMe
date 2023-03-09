import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'

import { client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({pin}) => {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const navigate = useNavigate()
  
  const user = fetchUser()

  const {postedBy, image, _id, save, comments} = pin

  let alreadySaved = save?.filter((item) => item?.userId === user.googleId);
  alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

  
  const savePin = id => {
    if(alreadySaved?.length === 0) {
      setSavingPost(true)
      client
        .patch(id)
        .setIfMissing({save: []})
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })
    }
  }

  const deletePin = id => {
    client.delete(id)
      .then(() => {
        window.location.reload()
      })
  }
  return (
    <div className='pin-wrapper m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-details/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        {image && (
          <img
            className="rounded-lg w-full" 
            src={(urlFor(image).width(250).url())} 
            alt="user-post" 
          /> 
        )}

        {postHovered && (
          <div 
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{height: '100%'}}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a 
                  href={`${image?.asset?.url}?dl=`} 
                  download 
                  onClick={e => e.stopPropagation()} //stops from redirectiong to image details
                  className='w-9 h-9 bg-white rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved?.length !== 0 ? (
                <button
                type='button'
                className='bg-gray-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                disabled >
                Saved
                </button>
              ) : (
                <button 
                type='button'
                className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                onClick={e => {
                  e.stopPropagation()
                  savePin(_id)
                }}
                 >
                  Save
                </button>
              )}
              {postedBy?._id === user?.googleId && (
                <button 
                type='button'
                className='bg-red-500 text-white font-bold text-base rounded-3xl hover:shadow-md outline-none p-2'
                onClick={e => {
                  e.stopPropagation()
                  deletePin(_id)
                }}
                 >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <div
                className='bg-red-500 text-white font-bold text-base text-xs rounded-3xl hover:shadow-md outline-none p-2'
              >
                {save?.length === 1 ? save?.length + 'save' : save?.length === 0 || !save?.length ? 'No saves' : save?.length + 'saves'} 
              </div>
              <div
                className='bg-red-500 text-white font-bold text-base text-xs rounded-3xl hover:shadow-md outline-none p-2'
              >
                {comments?.length > 1 ? comments?.length + 'comments' : comments?.length === 1 ? comments?.length + 'comment' : 'No comments'}
              </div>
            </div>
          </div>
        )}
      </div>

      <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center' >
        <img className='w-8 h-8 rounded-full object-cover' src={postedBy?.image} alt='user-profile' />
        <p className='font-semibold capitalized' >{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin