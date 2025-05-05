// pages/add-details.js
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import AddDetailsComponent from "@/components/AddDetailsComponent";
import Sidebar from "@/components/Sidebar";

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
  function sanitize(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  return {
    props: {
      session: sanitize(session),
    },
  };
}

export default function AddDetails({ session }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="ml-64 flex-1">
        <AddDetailsComponent session={session} />
      </div>
    </div>
  );
}
