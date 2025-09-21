import Header from '../components/Header'
import './globals.css'
export const metadata = { title: 'Home' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="min-h-screen flex flex-col bg-gradient-primary dark:bg-gradient-dark">
       <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      </body>
    </html>
  )
}
