
interface PillProps {
  text: string;
  color?: string;

}
const colorMap: { [key: string]: string } = {
  red: "bg-red-600",
  blue: "bg-blue-600",
  green: "bg-green-600",
  gray: "bg-gray-600",
  yellow: "bg-yellow-600",
};

const Pill: React.FC<PillProps> = ({ text, color = "gray" }) => {
  const bgClass = colorMap[color] || colorMap["red"]; // default to red
  return (
    <span className={`ml-1 ${bgClass} text-xs text-white p-1 rounded-lg`}>
      {text}
    </span>
  );
};

export default Pill;
