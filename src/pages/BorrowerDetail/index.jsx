import { useState } from "react";
import {
  ArrowLeft,
  Shield,
  TrendingUp,
  TrendingDown,
  Sparkles,
  LucideInfo,
} from "lucide-react";
import Avatar from "../../components/Avatar";
import Badge from "../../components/Badge";
import MetricCard from "../../components/MetricCard";
import OverviewTab from "./OverviewTab";
import AIAnalysisTab from "./AIAnalysisTab";
import { BadgeColor } from "../../components/Badge";

export default function BorrowerDetail({ borrower, onBack }) {
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getRiskVariant = (riskLevel) => {
    return riskLevel.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-[#fef8f8]">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl flex items-center gap-2 lg:gap-6 mx-auto px-4 md:px-6 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-start gap-2 md:gap-4">
            <Avatar name={borrower.name} size="md" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-sm md:text-xl font-bold text-gray-900">
                  {borrower.name}
                </h1>
                <Badge variant={getRiskVariant(borrower.risk_level)}>
                  {borrower.risk_level} RISK
                </Badge>
              </div>
              <p className="text-gray-600 text-xs md:text-sm">
                {borrower.business_name}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            icon={Shield}
            label="Credit Score"
            value={borrower.credit_score}
            subtitle="Out of 100"
            iconColor="text-[#770C05] bg-[#770C0529]  rounded-md"
            textColor={`${"text-[#0A0A0A]"}`}
          />

          <MetricCard
            icon={LucideInfo}
            label="Default Risk"
            value={`${borrower.default_risk}%`}
            subtitle="Probability"
            iconColor="text-[#00A63E] bg-[#DCFCE7]  rounded-md"
            textColor={BadgeColor(borrower.risk_level)}
          />
          <MetricCard
            icon={TrendingUp}
            label="Max Loan to Offer"
            value={formatCurrency(borrower.max_offer)}
            subtitle="Based on risk assessment"
            iconColor="text-[#00A63E] bg-[#DCFCE7]  rounded-md"
            textColor={``}
          />
          <MetricCard
            icon={TrendingDown}
            label="Expected Loss"
            value={formatCurrency(borrower.expected_loss)}
            subtitle="If default occurs"
            iconColor="text-purple-500 rounded-md bg-[#F3E8FF]"
            textColor={``}
          />
        </div>

        <div>
          <div className=" mb-6 bg-[#f3f3f5] rounded-xl">
            <div className="flex">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-6 rounded-xl w-full py-3 text-sm font-medium transition-colors  ${
                  activeTab === "overview"
                    ? "bg-white my-2 ml-2"
                    : "bg-transparent "
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("ai-analysis")}
                className={`px-6 rounded-xl w-full py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === "ai-analysis"
                    ? "bg-white my-2 mr-2"
                    : "bg-transparent "
                }`}
              >
                <Sparkles className="w-4 h-4" />
                AI Analysis
              </button>
            </div>
          </div>

          <div className=" py-6">
            {activeTab === "overview" && <OverviewTab borrower={borrower} />}
            {activeTab === "ai-analysis" && (
              <AIAnalysisTab borrower={borrower} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
