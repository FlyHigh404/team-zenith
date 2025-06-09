import React from 'react'

const Search = ({ tipe }) => {
  const isPekerjaan = tipe === 'pekerjaan';
  const placeholder1 = isPekerjaan
    ? 'Cari nama pekerjaan yang dicari'
    : 'Cari nama program sertifikasi yang dicari';
  const placeholder2 = 'Semua Kota/Provinsi';
  const judul = isPekerjaan
    ? 'Temukan Pekerjaan Impian Anda!'
    : 'Temukan Program Sertifikasi';

  return (
    <div className='bg-[#86CEEB] px-6 py-5 text-white'>
      <div className='lg:mx-14 md:mx-14 mx-5'>
        <h1 className='text-3xl font-medium'>{judul}</h1>
        <div className="grid grid-cols-[3fr_2fr_1fr] gap-4 mt-5">
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder1}
              className="pr-12 pl-4 py-3 rounded-full text-sm font-medium text-[#86CEEB] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-[#868686]"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder={placeholder2}
              className="pr-12 pl-4 py-3 rounded-full text-sm font-medium text-[#86CEEB] w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-[#868686]"
            />
          </div>
          <div>
            <button className="btn btn-outline-white bg-transparent px-auto w-full rounded-full text-white">
              Cari
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
