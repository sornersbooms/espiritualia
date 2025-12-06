import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: 'Espiritualia',
  description: 'Un viaje visual a través de conceptos espirituales.',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#2c3e50',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
  