import { useLogs } from "./hooks/queries/useLogs";
import { useMyPermissions } from "@/features/auth/hooks/queries/useMyPermissions";
import { Navigate } from "react-router-dom";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";

const LogPage = () => {
  const { data: myPermissions, isLoading: isAuthLoading } = useMyPermissions();
  const { data: logs, isLoading: isLogsLoading, error } = useLogs();

  if (isAuthLoading || isLogsLoading) {
    return <div className="p-8">Loading logs...</div>;
  }

  if (myPermissions?.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error loading logs</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
      </div>
      
      <DataTable columns={columns} data={logs || []} />
    </div>
  );
};

export default LogPage;
