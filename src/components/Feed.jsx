import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import EmptyLayout from './EmptyLayout'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)
    if(categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
        .then(data => {
          setPins(data)
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then(data => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [categoryId])

  //console.log(pins)

  if(loading) return <Spinner message='We are adding new ideas to your feed' />
  return (
    <div className='feed-wrapper'>
      {pins && <MasonryLayout pins={pins} />}
      {!pins || pins?.length === 0 && <EmptyLayout />}
    </div>
  )
}

export default Feed