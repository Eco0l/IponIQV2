import React from "react";
import { IsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { BarChart, Users, Activity } from "lucide-react";  // Import icons from lucide-react

const UserStats = dynamic(() => import("./UserStats"), { ssr: false });
const ProgressOverview = dynamic(() => import("./ProgressOverview"), { ssr: false });
const TopUsers = dynamic(() => import("./TopUsers"), { ssr: false });

const AnalyticsDashboard = async () => {
  const isAdmin = await IsAdmin();  // Check admin status

  if (!isAdmin) {
    redirect("/");  // Redirect if not an admin
    return null;    // Stop rendering after redirection
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-500" />
          Admin Data Analytics
        </h1>
        
        <div className="space-y-6">
          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <BarChart className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-700">User Statistics</h2>
            </div>
            <UserStats />
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-700">Progress Overview</h2>
            </div>
            <ProgressOverview />
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-700">Top Users</h2>
            </div>
            <TopUsers />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
