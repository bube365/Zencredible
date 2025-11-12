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
          <h3 className="font-medium text-[#0A0A0A]">
            Risk of Default Analysis
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-[#62748E] ">Default Probability</div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {borrower.default_risk}%
            </div>
            <div className="text-xs text-[#62748E]">Very Low Risk</div>
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-[#62748E]">Expected Loss</div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {formatCurrency(borrower.expected_loss)}
            </div>
            <div className="text-xs text-[#62748E]">If default occurs</div>
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-[#62748E] ">Loss Rate</div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {(
                (borrower.expected_loss / borrower.amount_requested) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-xs text-[#62748E]">Of loan amount</div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#EFF6FF] rounded-lg">
          <p className="text-sm text-[#155DFC]">
            <span className="font-semibold ">Default Risk Calculation:</span>{" "}
            Our AI model analyzes business cashflow patterns, fraudulent
            behaviours, receipt validation accuracy, transaction consistency,
            and credit history to calculate the probability of loan default.
            Expected loss = Loan amount x Default probability x (1 - Recovery
            rate)
          </p>
        </div>
      </section>

      {/* {financialData && ( */}
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
              N230,000
            </div>
            <div className="text-xs text-green-600">consistent pattern</div>
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-gray-600 ">
              Average Monthly Outflow
            </div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              N230,000
            </div>
            <div className="text-xs text-gray-600">within normal range</div>
          </div>

          <div className="bg-[#F8FAFC] p-4">
            <div className="text-sm text-gray-600">Net Average</div>
            <div className="text-3xl font-bold text-gray-900 my-2">
              {/* {formatCurrency(financialData.net_average)} */}
              N230,000
            </div>
            <div className="text-xs text-green-600">positive cashflow</div>
          </div>
        </div>
      </section>
      {/* )} */}
    </div>
  );
}
