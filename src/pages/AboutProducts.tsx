import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { TailSpin } from 'react-loader-spinner'

interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string
  createdAt: string
  updatedAt: string
  category: string
}

const AboutProducts: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [aboutProduct, setAboutProduct] = useState<Product | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await useAxios().get(`products/${id}`)
        setAboutProduct(response.data)
      } catch (error) {
        console.error('Failed to fetch product', error)
      }
    }

    fetchProduct()
  }, [id])

  if (!aboutProduct) {
    return (
      <div className="text-center text-xl font-semibold mt-20">
        <div className="flex items-center justify-center mt-10">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden transform transition-all hover:shadow-2xl">
        <div className="relative flex justify-between items-center  p-6 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-t-2xl">
          <h1 className="text-3xl font-bold">About Product</h1>
        </div>

        <div className="flex flex-col md:flex-row p-6 gap-6">
          <div className="md:w-1/2 w-full">
            <img
              className="h-80 w-full object-cover rounded-lg shadow-lg hover:opacity-90 transition-opacity duration-300"
              src={aboutProduct.images}
              alt={aboutProduct.name}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/300'
              }}
            />
          </div>

          <div className="md:w-1/2 w-full flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {aboutProduct.name}
              </h1>
              <p className="mt-4 text-lg text-gray-700">
                {aboutProduct.description}
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-3xl font-bold text-green-500">
                Price : ${aboutProduct.price}
              </span>
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-slate-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutProducts
