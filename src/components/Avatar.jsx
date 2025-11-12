export default function Avatar({ name, size = "md" }) {
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-base",
  };

  const colors = [
    "bg-red-600",
    "bg-blue-600",
    "bg-green-600",
    "bg-purple-600",
    "bg-orange-600",
    "bg-pink-600",
  ];

  const getColorFromName = (name) => {
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  // ${getColorFromName(name)}

  return (
    <div
      className={`${sizeClasses[size]} bg-[#770C05] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}
