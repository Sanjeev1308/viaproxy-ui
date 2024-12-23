import React from 'react';
import BannerSlider from '@/components/landing-page/Banner';
import ProductCard from '@/components/landing-page/ProductCard';
import Header from '@/components/landing-page/Header';
import Footer from '@/components/landing-page/Footer';

const featuredProducts = [
  {
    name: 'Classic T-Shirt',
    price: 29.99,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    name: 'Denim Jeans',
    price: 59.99,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    name: 'Leather Jacket',
    price: 199.99,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    name: 'Sneakers',
    price: 89.99,
    image: '/placeholder.svg?height=300&width=300',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main>
        <BannerSlider />

        <section className="container mx-auto px-10 py-8 sm:py-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </section>

        <section className="bg-primary text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6 sm:mb-8">
              Stay updated with our latest offers and promotions
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-md sm:rounded-r-none mb-2 sm:mb-0 focus:outline-none text-black"
              />
              <button
                type="submit"
                className="bg-white text-primary px-6 py-2 rounded-md sm:rounded-l-none hover:bg-gray-100 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
