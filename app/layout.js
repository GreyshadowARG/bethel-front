import "../styles/global.css";
import { Header } from "./components/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Bethel Administración</title>
      </head>
      <body>
         <Header />
         <div className="main_container">
          {children}
         </div>
      </body>
    </html>
  );
}
