import { useState, useEffect } from 'react'
import { useAxios } from '../hooks/useAxios'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from 'react-loader-spinner'

interface Product {
  id: number
  title: string
  price: number
  updatedAt: string
  images: string[]
}

const Products = () => {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const axios = useAxios()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get('products')
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => console.log(err))
  }, [axios])

  let productsItem = products?.map((product: Product) => (
    <div
      key={product.id}
      className="bg-white rounded-xl overflow-hidden shadow-lg transform hover:scale-105 hover:shadow-2xl transition-transform duration-300"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src = 'https://placehold.co/600x400?text=Not+Found'
        }}
        className="w-full h-64 object-cover rounded-t-xl"
      />
      <div
        onClick={() => navigate(`/about_products/${product.id}`)}
        className="p-6"
      >
        <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
        <p className="text-gray-700 mt-2 font-semibold">
          Price: ${product.price}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Updated: {product.updatedAt}
        </p>
        <button
          onClick={() => navigate(`/about_products/${product.id}`)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          More
        </button>
      </div>
    </div>
  ))

  if (isLoading) {
    return (
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
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">All Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {productsItem}
      </div>
    </div>
  )
}

export default Products
