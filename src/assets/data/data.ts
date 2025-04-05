import {
  Home,
  Users,
  Wallet,
  FileText,
  Settings,
  Bell,
  Package,
  Wrench,
  ClipboardList,
  Building2,
} from "lucide-react";

export const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Staff", href: "/staff", icon: Users },
  { name: "Payment Voucher", href: "/payment-voucher", icon: Wallet },
  { name: "Payroll", href: "/payroll", icon: FileText },
  { name: "Memo", href: "/memo", icon: ClipboardList },
  { name: "Circulars", href: "/circulars", icon: FileText },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Office Budget", href: "/office-budget", icon: Wallet },
  { name: "Stocks and Inventory", href: "/stocks", icon: Package },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Capacity Building", href: "/capacity-building", icon: Building2 },
  { name: "Procurements", href: "/procurements", icon: Settings },
];
