// import React from "react";
// import { useNavigate } from "react-router-dom";
//
// export default function StatCard({ title, value, icon, to, onClick }) {
//   const navigate = useNavigate();
//
//   const handleClick = () => {
//     if (typeof onClick === "function") return onClick();
//     if (to) return navigate(to);
//   };
//
//   const renderIcon = () => {
//     if (!icon) return null;
//     if (React.isValidElement(icon)) return icon;
//     const IconComp = icon;
//     try {
//       return <IconComp />;
//     } catch (e) {
//       return null;
//     }
//   };
//
//   return (
//     <div
//       onClick={handleClick}
//       className="flex items-center justify-between p-5 transition bg-white shadow cursor-pointer rounded-xl hover:shadow-lg"
//     >
//       <div>
//         <p className="text-sm text-gray-500">{title}</p>
//         <p className="text-2xl font-bold">{value}</p>
//       </div>
//       <div className="text-3xl text-blue-600">{renderIcon()}</div>
//     </div>
//   );
// }
import React from "react";
import { useNavigate } from "react-router-dom";

const colorMap = {
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  green: "bg-green-50 text-green-600 ring-green-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  purple: "bg-purple-50 text-purple-600 ring-purple-100",
  red: "bg-red-50 text-red-600 ring-red-100",
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  to,
  onClick,
  color = "blue",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (typeof onClick === "function") return onClick();
    if (to) return navigate(to);
  };

  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={handleClick}
      className={`
        group cursor-pointer rounded-2xl bg-white p-6
        shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        hover:ring-2 ${colors.split(" ").find(c => c.startsWith("ring-"))}
      `}
    >
      <div className="flex items-center justify-between">
        {/* Text */}
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors}`}
          >
            <Icon sx={{ fontSize: 26 }} />
          </div>
        )}
      </div>
    </div>
  );
}

