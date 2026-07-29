import { ColumnDef } from "@tanstack/react-table";
import { Log } from "../types/log";
import { format } from "date-fns";

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "CreatedAt",
    header: "Time",
    cell: ({ row }) => {
      return <div className="whitespace-nowrap">{format(new Date(row.getValue("CreatedAt")), "MMM d, yyyy HH:mm:ss")}</div>;
    },
  },
  {
    accessorKey: "User_Name",
    header: "User",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.original.User_Name}</span>
          <span className="text-xs text-muted-foreground">{row.original.User_Email}</span>
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
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === "Success" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : 
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        }`}>
          {status}
        </span>
      );
    },
  },
];
