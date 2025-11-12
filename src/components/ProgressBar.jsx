export default function ProgressBar({ percentage, color = 'bg-gray-900', label, description }) {
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900">{label}</span>
          {percentage !== undefined && (
            <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
          )}
        </div>
      )}
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300 rounded-full`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
