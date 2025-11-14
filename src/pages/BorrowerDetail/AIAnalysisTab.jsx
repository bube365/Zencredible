import { useState, useEffect } from "react";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import AnalysisCard from "../../components/AnalysisCard";
import ProgressBar from "../../components/ProgressBar";
import { supabase } from "../../lib/supabase";

export default function AIAnalysisTab({ borrower }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchAnalyses();
  }, [borrower.id]);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from("ai_analysis")
        .select("*")
        .eq("borrower_id", borrower.id)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setAnalyses(data || []);
    } catch (error) {
      console.error("Error fetching analyses:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#F3E8FF] p-2 rounded-lg">
            <Shield className="w-4 h-4 text-purple-600" />
          </span>
          <h3 className="font-semibold text-gray-900">
            AI-Powered Risk Assessment
          </h3>
        </div>

        <div className="space-y-3">
          {borrower?.creditFactors?.map((analysis, idx) => (
            <AnalysisCard
              key={idx}
              status={analysis.impact}
              description={analysis.value}
            />
          ))}
        </div>
      </section>

      {borrower?.riskAnalysis?.roundTripTransactions?.details && (
        <section className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#fbc8c8] p-2 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-700" />
            </span>
            <h3 className="font-semibold text-gray-900">
              Round-Tripping Analysis
            </h3>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">
                Round-trip transaction detection
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {borrower?.riskAnalysis?.roundTripTransactions?.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-red-700 transition-all duration-300 rounded-full"
                style={{
                  width: `${borrower?.riskAnalysis?.roundTripTransactions?.percentage}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 ">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Our AI model identified{" "}
              <span className="font-bold text-lg">
                {borrower?.riskAnalysis?.roundTripTransactions?.detected}
              </span>{" "}
              potential round-trip transactions by analyzing:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              {borrower?.riskAnalysis?.roundTripTransactions?.details?.map(
                (detail) => {
                  return (
                    <li className="flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{detail}</span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow">
        <div
          className="flex items-center gap-2 mb-4"
          onClick={() => setShowDetails((prev) => !prev)}
        >
          <span className="bg-[#DCFCE7] p-2 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-green-600" />
          </span>
          <h3 className="font-semibold text-gray-900">
            Business Flow Validation{" "}
            {!showDetails && (
              <span className="text-xs text-gray-500 ml-2 bg-white p-2 shadow-md">
                Coming Soon
              </span>
            )}
          </h3>
        </div>

        {showDetails && (
          <div className="space-y-6 mt-4">
            <ProgressBar
              label="Sales Receipts Match"
              description="92% of bank inflows match timestamped sales receipts"
              percentage={92}
              color="bg-gray-900"
            />

            <ProgressBar
              label="Sales Records Alignment"
              description="89% of transactions align with submitted sales records"
              percentage={89}
              color="bg-gray-900"
            />
          </div>
        )}
      </section>
    </div>
  );
}
