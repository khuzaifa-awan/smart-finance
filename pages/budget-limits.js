import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import BudgetLimitComponent from "@/components/BudgetLimitComponent";
import Sidebar from "../components/Sidebar";
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}

export default function BudgetLimits({ session }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <BudgetLimitComponent session={session} />
      </div>
    </div>
  );
}
