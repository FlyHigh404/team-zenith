import React from 'react'

function Home() {
  return (
    <>
      <section className="bg-white min-h-screen flex" id="home">
        <div className="flex flex-col w-[60%] items-center justify-center">
          <div className="max-w-full mx-auto px-24">
            <h1 className="text-4xl font-semibold mb-4 text-black">Welcome to UNEDO, where talent meets opportunity. Join us today!</h1>
            <p className="text-lg text-gray-700 mb-3">
              Discover a world of possibilities with UNEDO. Your journey starts here. Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt alias nam eum facere delectus cum dignissimos.
            </p>
            <button className="px-4 py-2 border border-white bg-[#1201C9] text-white rounded-3xl hover:bg-blue-700">Get Started</button>
          </div>
        </div>

        <div className="flex items-center justify-start w-[40%]">
          <div className="px-24">
            <img src="https://placehold.jp/500x500.png" alt="Placeholder" className="rounded-full shadow-lg object-cover w-full" />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 h-full py-20 flex" id="about">
        <div className="flex flex-col w-1/2 items-center justify-center px-24">
          <img src="https://placehold.jp/700x400.png" alt="Placeholder" className="rounded-lg shadow-lg object-cover" />
        </div>

        <div className="flex items-center justify-start w-1/2">
          <div className="max-w-full mx-auto pr-24">
            <h2 className="text-md font-bold mb-2 text-[#1201C9]">ABOUT US</h2>
            <p className="text-2xl text-gray-700 mb-3 font-bold">At UNEDO, we are committed to connecting talented individuals with exciting job opportunities.</p>
            <p className="text-lg text-gray-700 mb-3">Whether you're looking for your dream job or seeking the perfect candidate, UNEDO is here to help. Join us on this journey of discovery and achievement.</p>
          </div>
        </div>
      </section>

      <section className="bg-white min-h-screen"></section>
    </>
  )
}

export default Home
