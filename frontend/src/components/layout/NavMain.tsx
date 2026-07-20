import {
  FolderTree,
  KeyRound,
  LayoutDashboard,
  Package,
  Shield,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";

export const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },

  {
    title: "Users",
    url: "/users",
    icon: Users,
  },

  {
    title: "Roles",
    url: "/roles",
    icon: Shield,
  },

  {
    title: "Permissions",
    url: "/permissions",
    icon: KeyRound,
  },

  {
    title: "Role Users",
    url: "/role-users",
    icon: UserCog,
  },

  {
    title: "Role Permissions",
    url: "/role-permissions",
    icon: ShieldCheck,
  },

  {
    title: "Categories",
    url: "/categories",
    icon: FolderTree,
  },

  {
    title: "Products",
    url: "/products",
    icon: Package,
  },
];