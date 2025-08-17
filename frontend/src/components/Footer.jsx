import React from 'react'
import assets, { images } from'../assets/data/assets'

const Footer = () => {
  return (
    <footer className="px-6 mt-30 w-full">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500 pb-14">
        <div className="md:max-w-96">
          <img alt="" className="h-11" src={images.logo} />
          <p className="mt-6 text-sm line-clamp-3">
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
          <div>
            <h2 className="font-semibold mb-5">Sunject</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/">Home</a></li>
              <li><a href="/subject">Subject</a></li>
              <li><a href="/watchlater">Add To List</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              
              <p>theosrayministry.salem@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-sm pb-5">
        Copyright {new Date().getFullYear()} © Theso Ray Ministry. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer