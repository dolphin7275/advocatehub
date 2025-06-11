import React from 'react'
import Assets from '../../assets/assets'

const Search = () => {
  return (
    <div className="font-sans">

      {/* Step Cards Section */}
      <section className="bg-[#0e1a3c] py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.searchLawyer}
              alt="Search Lawyer"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Search Lawyer</h3>
            <p className="text-sm text-gray-300 max-w-xs">
              Enter your location and legal concern to explore verified lawyers
              near you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.bookLawyer}
              alt="Book Lawyer"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Book Lawyer</h3>
            <p className="text-sm text-gray-300 max-w-xs">
              View real-time availability and book a convenient appointment
              instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.meetLawyer}
              alt="Meet Lawyer"
              className="w-20 h-20 mb-4"
            />
            <h3 className="text-lg font-bold mb-2">Meet lawyer</h3>
            <p className="text-sm text-gray-300 max-w-xs">
              Talk to your lawyer through secure video call or live chat,
              whenever it suits you.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Search
