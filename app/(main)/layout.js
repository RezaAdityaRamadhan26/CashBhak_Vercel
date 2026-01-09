import Sidebar from "./Sidebar";
import TopBar from "./TopBar.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-[var(--light-custom)] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto">
        <TopBar />
        <div className="flex-1">{children}</div>
      </main>
    </div>
  );
}
