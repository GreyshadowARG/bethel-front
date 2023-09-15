import "../styles/global.css";
import { Header } from "./components/Header";
import Providers from "./Providers";
 
export const metadata = {
  title: "Casa Bethel - Software de gestión",
  description: "Software de gestión de población",
};

export default function MainLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Header />
        <div className="main_container">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}