import { createContext, useState } from "react";
interface IAdminContext {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}
export const AdminDashboadContext = createContext<IAdminContext | null>(null);
export const AdminDashboadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AdminDashboadContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </AdminDashboadContext.Provider>
  );
};
