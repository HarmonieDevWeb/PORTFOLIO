import "./globals.css";
import Header from '@/components/Header';


export const metadata = {
  title: "Portfolio - Harmonie Chevrel",
  description: "Portfolio de Harmonie Chevrel, développeuse web et mobile.",
};

export default function RootLayout({ children }) {
 return (
    <html lang="fr">
      <head>
    <link rel="icon" href="/badge-logo-icon.svg" />
</head>
      <body className="antialiased ">
        <Header />
        {children}
        
      </body>
    </html>
  );
}