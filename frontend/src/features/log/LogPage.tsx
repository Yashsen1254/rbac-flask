import { useState } from "react";
import { Navigate } from "react-router-dom";
import { format } from "date-fns";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef, ColumnFiltersState } from "@tanstack/react-table";
import { useLogs } from "./hooks/queries/useLogs";
import { useMyPermissions } from "@/features/auth/hooks/queries/useMyPermissions";
import type { Log } from "./types/log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { exportLogsCSV, exportLogsPDF } from "./api/logApi";
import { Download } from "lucide-react";

const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "CreatedAt",
    header: "Time",
    cell: ({ row }) => {
      return (
        <div className="whitespace-nowrap">
          {format(new Date(row.getValue("CreatedAt")), "MMM d, yyyy HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "User_Name",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.User_Name}</span>
          <span className="text-xs text-muted-foreground">
            {row.original.User_Email}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Module",
    header: "Module",
  },
  {
    accessorKey: "Action",
    header: "Action",
  },
  {
    accessorKey: "Method",
    header: "Method",
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("Status") as string;
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === "Success"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

const LogPage = () => {
  const { data: myPermissions, isLoading: isAuthLoading } = useMyPermissions();
  const { data: logs, isLoading: isLogsLoading, error } = useLogs();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: logs || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleExportCSV = async () => {
    try {
      const blob = await exportLogsCSV();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "activity_logs.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExportPDF = async () => {
    try {
      const blob = await exportLogsPDF();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "activity_logs.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

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
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter users..."
            value={
              (table.getColumn("User_Name")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("User_Name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <Button onClick={handleExportCSV}>
          <Download className="mr-2 h-4 w-4" />
          CSV
        </Button>
        <Button onClick={handleExportPDF}>
          <Download className="mr-2 h-4 w-4" />
          PDF
        </Button>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No logs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogPage;
