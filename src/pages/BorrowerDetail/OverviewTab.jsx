import { useState, useEffect } from "react";
import { TrendingUp, AlertTriangle } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function OverviewTab({ borrower }) {
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinancialData();
  }, [borrower.id]);

  const fetchFinancialData = async () => {
    try {
      const { data, error } = await supabase
        .from("financial_summary")
        .select("*")
        .eq("borrower_id", borrower.id)
        .maybeSingle();

      if (error) throw error;
      setFinancialData(data);
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <section className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 bg-[#DCFCE7] rounded-lg">
            <AlertTriangle className="w-4 h-4   text-green-600" />
          </span>
          <h3 className="font-medium text-[#0A0A0A]">Risk Analysis</h3>
        </div>

        <ul className="my-4 text-sm text-[#0A0A0A]">
          <li className="font-bold mb-2 list-disc list-inside">
            Fraud Indicators
          </li>

          {borrower?.riskAnalysis?.fraudIndicators?.map((item, index) => (
            <li key={index} className="ml-4 mb-1 list-none">
              - {item}
            </li>
          ))}
        </ul>

        <div className="mt-2 p-4 bg-[#EFF6FF] rounded-lg">
          <p className="text-sm text-[#155DFC]">
            <span className="font-semibold ">Default Risk Calculation:</span>{" "}
            Our AI model analyzes business cashflow patterns, fraudulent
            behaviours, receipt validation accuracy, transaction consistency,
            and credit history to calculate the probability of loan default.
            {/* Expected loss = Loan amount x Default probability x (1 - Recovery
            rate) */}
          </p>
        </div>
      </section>

      <section className="bg-white rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="p-2 bg-[#DCFCE7] rounded-lg">
            <AlertTriangle className="w-4 h-4   text-green-600" />
          </span>{" "}
          <h3 className="font-semibold text-gray-900">Financial Summary</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-gray-600 ">Average Monthly Inflow</div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {formatCurrency(borrower?.financialSummary?.averageMonthlyInflow)}{" "}
            </div>
            <div className="text-xs ">
              {borrower?.financialSummary?.cashFlowPattern} Pattern
            </div>
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-gray-600 ">
              Average Monthly Outflow
            </div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {formatCurrency(
                borrower?.financialSummary?.averageMonthlyOutflow
              )}{" "}
            </div>
            {/* <div className="text-xs text-gray-600">within normal range</div> */}
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-gray-600">Net Average</div>
            <div
              className={`text-3xl font-bold   my-2 ${
                borrower?.financialSummary?.netAverage > 0
                  ? "text-gray-900"
                  : "text-red-700"
              }`}
            >
              {formatCurrency(borrower?.financialSummary?.netAverage)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
