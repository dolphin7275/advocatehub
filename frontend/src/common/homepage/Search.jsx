import React from 'react'
import Assets from '../../assets/assets'

const Search = () => {
  return (
    <div className="">

      {/* Step Cards Section */}
      <section className="text-[#eeebe6] py-15 px-4 bg-[#6E7582]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.searchLawyer}
              alt="Search Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl font-bold pt-3 mb-2 text-[#8C2B32]">Search Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              Enter your location and legal concern to explore verified advocates
              near you.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.bookLawyer}
              alt="Book Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold mb-2 text-[#8C2B32]">Book Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              View real-time availability and book a convenient appointment
              instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <img
              src={Assets.meetLawyer}
              alt="Meet Advocate"
              className="w-30 h-30 mb-4"
            />
            <h3 className="text-xl pt-3 font-bold text-[#8C2B32] mb-2">Meet Advocate</h3>
            <p className="text-base text-[#F8F8F5] max-w-xs">
              Talk to your advocate through secure video call or live chat,
              whenever it suits you.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Search
