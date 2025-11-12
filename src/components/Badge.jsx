export default function Badge({ children, variant = "default" }) {
  const variants = {
    low: "bg-[#DCFCE7] text-[#016630]",
    medium: "bg-orange-100 text-orange-700 border border-orange-200",
    high: "bg-red-100 text-red-700 border border-red-200",
    default: "bg-gray-100 text-gray-700 border border-gray-200",
  };

  return (
    <span
      className={`${variants[variant]} py-2 px-4 rounded-2xl text-[10px] md:text-xs font-medium uppercase`}
    >
      {children}
    </span>
  );
}

export const BadgeText = ({ children, variant = "default" }) => {
  const variants = {
    low: " text-[#016630] ",
    medium: " text-orange-700",
    high: " text-red-700 ",
    default: "text-gray-700 ",
  };

  return (
    <span className={`${variants[variant]} text-lg font-semibold`}>
      {children}
    </span>
  );
};

export const BadgeColor = (variant) => {
  switch (variant?.toLowerCase()) {
    case "low":
      return "text-[#016630]";
    case "medium":
      return "text-orange-700";
    case "high":
      return "text-red-700";
    default:
      return "text-gray-900"; // fallback
  }
};
