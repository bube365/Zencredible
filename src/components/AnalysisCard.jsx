import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function AnalysisCard({ status, description }) {
  const Icon = status === "positive" ? CheckCircle2 : AlertTriangle;
  const iconColor =
    status === "positive"
      ? "text-green-500"
      : status === "warning"
      ? "text-yellow-500"
      : "text-red-700";
  const bgColor = status === "success" ? "bg-green-50" : "bg-yellow-50";

  return (
    <div className={`bg-[#F8FAFC] rounded-lg p-4 flex items-start gap-3`}>
      <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
      <p className="text-sm text-gray-700 flex-1">{description}</p>
    </div>
  );
}
