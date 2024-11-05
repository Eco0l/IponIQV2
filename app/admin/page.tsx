import { IsAdmin } from "@/lib/admin";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage = async () => {
  const isAdmin = await IsAdmin();  // Await the async function

  if (!isAdmin) {
    redirect("/");
    return null; // Exit rendering after redirection
  }

  return <App />;
};

export default AdminPage;
