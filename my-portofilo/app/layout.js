import "./globals.css";

export const metadata = {
  title: "Portfolio - Harmonie",
  description: "Portfolio et CV professionnel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}