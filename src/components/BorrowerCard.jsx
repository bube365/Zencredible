import { ChevronRight, CheckCircle } from "lucide-react";
import Avatar from "./Avatar";
import Badge from "./Badge";
import { BadgeText } from "./Badge";
export default function BorrowerCard({ borrower, onClick }) {
  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getRiskVariant = (riskLevel) => {
    return riskLevel.toLowerCase();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg p-3 md:p-4 lg:p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row items-start gap-4">
        <Avatar name={borrower?.user?.fullName} size="md" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-[#0A0A0A]">
              {borrower?.user?.fullName}
            </h3>
            {/* {borrower.bvn_verified && (
              <CheckCircle className="w-4 h-4 text-[#016630]" />
            )} */}
          </div>
          <p className="text-sm text-[#868786] mb-6">
            {borrower?.user?.businessName}
          </p>

          <div className="grid grid-cols-2 md:grid-col-3 md:flex justify-between w-full gap-4 mb-4">
            <div>
              <div className=" text-sm lg:text-base text-[#868786] mb-1">
                Credit Score
              </div>
              <div className="font-medium text-lg text-[#0A0A0A]">
                {borrower?.creditScore} / 850
              </div>

              {/* <p className="my-6 text-sm w-fit lg:w-full lg:text-base  border border-[#0A0A0A1A] text-[#0A0A0A] p-2  rounded-2xl">
                {borrower.bvn_verified ? "BVN Verified" : "BVN Pending"}
              </p> */}
            </div>
            <div>
              <div className="text-sm lg:text-base text-[#868786] mb-1">
                Default Risk
              </div>
              <BadgeText variant={getRiskVariant(borrower.riskLevel)}>
                {borrower.defaultProbability}%
              </BadgeText>
              {/* <p className="my-6 text-sm w-fit lg:w-full lg:text-base  border border-[#0A0A0A1A] text-[#0A0A0A] p-2  rounded-2xl">
                3/3 Documents
              </p> */}
            </div>
            <div>
              <div className="text-sm lg:text-base text-[#868786] mb-2">
                Risk Level
              </div>
              <Badge variant={getRiskVariant(borrower.riskLevel)}>
                {borrower.riskLevel}
              </Badge>

              {/* <p className="my-6 text-sm w-fit lg:w-full lg:text-base  border border-[#0A0A0A1A] text-[#0A0A0A] p-2  rounded-2xl">
                {borrower.months_analyzed} Months Analyzed
              </p> */}
            </div>
            <div>
              <div className="text-sm lg:text-base text-[#868786] mb-2">
                Max loan allowed to borrow
              </div>
              <div className="font-medium text-xl text-[#0A0A0A]">
                {formatCurrency(borrower?.maxLoanAmount)}
              </div>
            </div>
            <div>
              <div className="text-sm lg:text-base text-[#868786] mb-2">
                Expected Loss
              </div>
              <div className="font-medium text-xl text-red-700">
                {borrower?.expectedLoss > 0
                  ? formatCurrency(borrower.expectedLoss)
                  : "NO"}
              </div>
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
      </div>
    </div>
  );
}
