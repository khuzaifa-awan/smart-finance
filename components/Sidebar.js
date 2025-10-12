import Link from "next/link";
import { signOut } from "next-auth/react";
import { AiOutlineHome, AiOutlineLogout } from "react-icons/ai";
import { BiMoneyWithdraw } from "react-icons/bi";
import { IoAddCircleOutline, IoAnalytics } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-blue-900 text-white p-6">
      <div className="flex flex-col space-y-6">
        <Link href="/home">
          <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer">
            <AiOutlineHome size={24} />
            <span>Home</span>
          </div>
        </Link>

        <Link href="/budget-limits">
          <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer">
            <BiMoneyWithdraw size={24} />
            <span>Manage Budget Limits</span>
          </div>
        </Link>

        <Link href="/addDetails">
          <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer">
            <IoAddCircleOutline size={24} />
            <span>Add Details</span>
          </div>
        </Link>
        <Link href="/fundamentalAnalysis">
          <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer">
            <IoAnalytics size={24} />
            <span>Fundamental Analysis</span>
          </div>
        </Link>
        <Link href="/goalbased">
          <div className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer">
            <IoAddCircleOutline size={24} />
            <span>Create Goal</span>
          </div>
        </Link>

        

        <button
          onClick={() => signOut()}
          className="flex items-center space-x-3 p-3 rounded hover:bg-blue-800 transition cursor-pointer text-left w-full"
        >
          <AiOutlineLogout size={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
