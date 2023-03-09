import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const getProjectId = () => {
    const SHAREME_SANITY_PROJECTID = import.meta.env.VITE_SHAREME_SANITY_PROJECTID
  
    if (!SHAREME_SANITY_PROJECTID) {
      throw new Error("SHAREME_SANITY_PROJECTID needs to be defined");
    }
  
    return SHAREME_SANITY_PROJECTID;
  }
const getProjectToken = () => {
    const SHAREME_SANITY_TOKEN = import.meta.env.VITE_SHAREME_SANITY_TOKEN
  
    if (!SHAREME_SANITY_TOKEN) {
      throw new Error("SHAREME_SANITY_TOKEN needs to be defined");
    }
  
    return SHAREME_SANITY_TOKEN;
  }

export const client = sanityClient({
    projectId: getProjectId(),
    dataset: 'production',
    apiVersion: '2023-02-13',
    useCdn: false,
    token: getProjectToken(),
})

export const builder = imageUrlBuilder(client)

export const urlFor = source => builder.image(source)