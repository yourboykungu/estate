import React from 'react'

export default function CreateListing() {
  return (
    <div className='p-3 max-w-4xl mx-auto'>
        <h1 className="text-3xl font-semibold text-center my-7">Create a Listing</h1>
        <form action="" className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" className="border p-3 rounded-lg" id='name' placeholder='name' maxLength='62' minLength='10' required />
                <textarea type="text" className="border p-3 rounded-lg" id='description' placeholder='description' required />
                <input type="text" className="border p-3 rounded-lg" id='address' placeholder='address' required />
                <div className="flex gap-6 flex-wrap">
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span>Sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span className="capitalize">sell</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span className="capitalize">rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span className="capitalize">parking spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span className="capitalize">furnished</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id='sale' className="w-5" />
                        <span className="capitalize">offer</span>
                    </div>     
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center">
                        <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" />
                        <p className="capitalize">beds</p>
                    </div>
                    <div className="flex items-center">
                        <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" />
                        <p className="capitalize">baths</p>
                    </div>
                    <div className="flex items-center">
                        <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" />
                        <div className="flex flex-col items-center">
                            <p className="capitalize">regular price</p>
                            <span className="text-sm">($ / month)</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input type="number" id="bedrooms" min='1' max='10' className="p-3 border border-gray-300 rounded-lg" />
                        <div className="flex flex-col items-center">
                        <p className="capitalize">discounted price</p>
                        <span className="text-sm">($ / month)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">Images:
                <span className='font-normal texte-gray-600 ml-2'>the first image will be te cover(max 6)</span>
            </p>
            <div className='flex gap-4'>
                <input className='p-3 border border-gray-300 rounded w-full' type="file" id='images' accept='image/*' multiple />
                <button className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">Upload</button>
            </div>
            <button className="p-3 bg-slate-700 text-white rounded-l uppercase hover:opacity-95 disabled:opacity-80">create listing</button>
            </div>
        </form>
    </div>
  )
}
