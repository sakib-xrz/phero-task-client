import AuthGuardHoc from "@/components/shared/AuthGuardHoc";
import Navbar from "@/components/shared/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuardHoc>
      <Navbar />
      {children}
    </AuthGuardHoc>
  );
}
