// app/layout.js
import "./globals.css";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

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
      <body className="antialiased">
        <Providers>
          <Header />
          <div className="hidden md:block fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2">
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/6l4a8jfBW4eIOPHmiDV0mu?utm_source=generator&theme=0"
              width="300"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}