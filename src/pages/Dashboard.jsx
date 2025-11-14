import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import BorrowerCard from "../components/BorrowerCard";
import { supabase } from "../lib/supabase";
import { Navbar } from "../components/Navbar";
import { useFetchCreditScoreQuery } from "../store/api/authApi";
import { Loader } from "../common/loader";

export default function Dashboard({ onSelectBorrower }) {
  const { data, error, isLoading, isFetching } = useFetchCreditScoreQuery();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredBorrowers = data?.data?.rows.filter(
    (data) =>
      data?.user?.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data?.user?.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fef8f8]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-6 pb-8 pt-24 md:pt-28">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl font-medium text-gray-900 mb-1">
            Credit Assessment Dashboard
          </h1>
          <p className="text-[#868786] font-normal text-xs md:text-sm">
            Review borrower applications with AI-powered analysis
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#868786] " />
            <input
              type="text"
              placeholder="Search by name or business..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3  rounded-lg text-[#868786] text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-[#F3F3F5]"
            />
          </div>
        </div>

        {isFetching || isLoading ? (
          <div className="text-center py-12">
            <Loader text="Please wait..." />
          </div>
        ) : filteredBorrowers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500">
              No potential borrowers to display at this time
            </div>{" "}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBorrowers.map((borrower) => (
              <BorrowerCard
                key={borrower.id}
                borrower={borrower}
                onClick={() => onSelectBorrower(borrower)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
