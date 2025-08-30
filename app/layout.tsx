import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Napstify v2.0 BETA 6',
  description: 'Windows 98-style Spotify search interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-win98 h-screen overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#c0c0c0' }}>
        {children}
      </body>
    </html>
  )
}
