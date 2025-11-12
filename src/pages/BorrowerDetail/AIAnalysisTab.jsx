import { useState, useEffect } from "react";
import { Shield, TrendingUp, AlertTriangle } from "lucide-react";
import AnalysisCard from "../../components/AnalysisCard";
import ProgressBar from "../../components/ProgressBar";
import { supabase } from "../../lib/supabase";

export default function AIAnalysisTab({ borrower }) {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const aiPoweredAnalyses = analyses.filter((a) =>
    ["correlation", "cashflow", "round_tripping", "personal_usage"].includes(
      a.analysis_type
    )
  );

  const roundTrippingAnalysis = analyses.find(
    (a) => a.analysis_type === "round_tripping"
  );

  const aiPoweredAnalysess = [
    {
      id: 1,
      status: "success",
      description:
        "Strong correlation (92%) between sales receipts timestamps and bank deposits, indicating genuine business transactions.",
    },
    {
      id: 2,
      status: "success",
      description:
        "Consistent monthly cash flow pattern over 14 months with positive net income averaging ₦230,000/month.",
    },
    {
      id: 3,
      status: "success",
      description:
        "Low round-tripping detected (8%), well within acceptable threshold. Most flagged transactions have valid business justification.",
    },
    {
      id: 4,
      status: "warning",
      description:
        "Irregular transaction spike detected in April — manual review suggested.",
    },
  ];

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
          {aiPoweredAnalysess.map((analysis) => (
            <AnalysisCard
              key={analysis.id}
              // type={analysis.analysis_type}
              status={analysis.status}
              description={analysis.description}
              // percentage={analysis.percentage}
            />
          ))}
        </div>
      </section>

      {roundTrippingAnalysis && (
        <section className="bg-white rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#DCFCE7] p-2 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-green-600" />
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
                {roundTrippingAnalysis.percentage}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gray-900 transition-all duration-300 rounded-full"
                style={{ width: `${roundTrippingAnalysis.percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 ">
            <p className="text-sm font-medium text-gray-900 mb-3">
              Our AI model identified 12 potential round-trip transactions by
              analyzing:
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>
                  Same day deposits and withdrawals of similar amounts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>
                  Repetitive transaction patterns with consistent counterparties
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>
                  Unusual transaction velocity during specific periods
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span>
                  Cross-referenced with sales receipts and records timestamps
                </span>
              </li>
            </ul>
          </div>
        </section>
      )}

      <section className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#DCFCE7] p-2 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-green-600" />
          </span>{" "}
          <h3 className="font-semibold text-gray-900">
            Business Flow Validation
          </h3>
        </div>

        <div className="space-y-6">
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
      </section>
    </div>
  );
}
