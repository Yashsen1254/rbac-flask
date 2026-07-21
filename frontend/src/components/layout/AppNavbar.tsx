import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";

const AppNavbar = () => {

  return (

    <header className="h-16 border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h2 className="text-xl font-semibold">
          Dashboard
        </h2>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default AppNavbar;