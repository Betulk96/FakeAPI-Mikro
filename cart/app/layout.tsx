import Header from '../components/Header'
import './globals.css'
export const metadata = { title: 'Cart' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
     <body className="min-h-screen flex flex-col bg-gradient-primary dark:bg-gradient-dark">
       <Header />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
