import Sidebar from "./Sidebar";
import TopBar from "./TopBar.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-[var(--light-custom)]">
      <Sidebar />
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <TopBar />
        {children}
      </main>
    </div>
  );
}
