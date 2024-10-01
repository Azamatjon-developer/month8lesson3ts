import { useParams } from 'react-router-dom'
import { useAxios } from '../hooks/useAxios'
import { useState } from 'react'

const AboutProducts = () => {
  const { id } = useParams()
  const [aboutProduct, setAboutProduct] = useState({ id })
  useAxios()
    .get(`products/${id}`)
    .then((res) => setAboutProduct(res.data))
  return (
    <div>
        <div>
            <h2>{aboutProduct.title}</h2>
        </div>
      <h2>About</h2>
    </div>
  )
}

export default AboutProducts
