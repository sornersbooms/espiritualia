import '@/styles/globals.css'
import { Analytics } from "@vercel/analytics/next"
import { GoogleTagManager } from '@next/third-parties/google'
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
      <GoogleTagManager gtmId="GTM-N563ZPZH" />
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
