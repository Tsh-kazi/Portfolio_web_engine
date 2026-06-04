import { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Christian Kazi Portfolio Studio',
}

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      {children}
    </div>
  )
}
