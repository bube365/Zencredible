export default function MetricCard({
  icon: Icon,
  label,
  value,
  subtitle,
  iconColor = "text-gray-400",
  textColor = "text-gray-900 ",
}) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 ${iconColor}`}>
          {Icon && <Icon className={`w-5 h-5 `} />}
        </div>
        <span className="text-sm text-gray-600">{label}</span>
      </div>
      <div className={`text-2xl font-medium my-4 ${textColor}`}>{value}</div>
      {subtitle && <div className="text-xs text-[#62748E]">{subtitle}</div>}
    </div>
  );
}
