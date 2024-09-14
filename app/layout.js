import "./globals.css";

export const metadata = {
  title: 'Resume Builder - Create and Manage Your Resumes Easily',
  description: 'Effortlessly create, manage, and customize your resumes with our Resume Builder. Design professional resumes tailored to your needs with our intuitive platform.',
  keywords: 'Resume Builder, create resumes, manage resumes, resume design, professional resumes, make resumes, build resumes, resume management, Next.js, React',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Resume Builder - Create and Manage Your Resumes Easily',
    description: 'Effortlessly create, manage, and customize your resumes with our Resume Builder. Design professional resumes tailored to your needs with our intuitive platform.',
    type: 'website',
    url: 'https://resu-build.vercel.app/',
    images: [
      {
        url: 'https://resu-build.vercel.app/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Builder',
      },
    ],
  },
  icons: {
    apple: '/favicon.png',
    icon: [
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  canonical: 'https://resu-build.vercel.app/',
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full">{children}</body>
    </html>
  );
}
