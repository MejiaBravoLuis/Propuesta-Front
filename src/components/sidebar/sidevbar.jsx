import './sidebar.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import { cn } from "../../lib/utils";
import { useUserDetails } from '../../shared/hooks/useUserDetails';

export function SidebarDemo() {
  const { isLogged, logout, username } = useUserDetails();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true); 

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    setOpen(false);
  };
  

  const links = [
    {
      label: isLogged ? "Logout" : "Login",
      onClick: isLogged ? handleLogout : () => handleNavigate("/auth"),
    }
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className={cn("transition-all duration-300", open ? "w-64" : "w-20")}>
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="sidebar-body justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="sidebar-links mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={{ ...link, href: "#" }}
                    onClick={link.onClick}
                    className="sidebar-link"
                  />
                ))}
              </div>
            </div>
            <div className="sidebar-footer">
              <SidebarLink
                link={{
                  label: isLogged ? username : "User",
                  href: "/settings",
                }}
                className="sidebar-link"
              />
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      <div className="flex flex-1 transition-all duration-300 overflow-hidden">
        <Dashboard />
      </div>
    </div>
  );
}


const Dashboard = () => (
  <div className="flex flex-1 flex-col gap-2 p-2 md:p-10 rounded-tl-2xl border bg-white dark:bg-neutral-900 dark:border-neutral-700">
    <div className="flex gap-2">
      {[...Array(4)].map((_, idx) => (
        <div key={idx} className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
    <div className="flex flex-1 gap-2">
      {[...Array(2)].map((_, idx) => (
        <div key={idx} className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
      ))}
    </div>
  </div>
);