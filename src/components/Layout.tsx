// components/Layout.tsx
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="p-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
