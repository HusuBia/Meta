import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NextStep',
  description: 'Platformă de consiliere personalizata bazata pe AI',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gradient-to-b from-blue-50 to-purple-100 min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
