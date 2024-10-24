import Link from "next/link";
import { logoutUser } from "../api/auth";

interface NavigationProps {
  isOpen: boolean;
  links: Array<{
    text: string;
    route: string;
  }>;
  auth?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  isOpen,
  links,
  auth = false,
}) => {
  if (isOpen) {
    return (
      <nav className="text-gray-500 absolute top-[3.75em] end-0 grid grid-flow-row bg-white shadow-lg z-0">
        {links.map((link) => (
          <Link
            className="px-8 py-3 border-y border-b-gray-200 hover:bg-gradient-to-r from-white to-emerald-300"
            href={link.route}
          >
            {link.text}
          </Link>
        ))}
        {auth && (
          <Link
            className="px-8 py-3 border-y border-b-gray-200 hover:bg-gradient-to-r from-white to-emerald-300"
            href="/"
            onClick={logoutUser}
          >
            Logout
          </Link>
        )}
      </nav>
    );
  }
};

export default Navigation;
