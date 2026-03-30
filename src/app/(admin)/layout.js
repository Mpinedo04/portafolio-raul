export const metadata = {
  title: 'CENTRO DE MANDO 🎬 | Raúl García',
  description: 'Panel de control exclusivo para la gestión del portfolio.',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0, background: '#101112' }}>
        {children}
      </body>
    </html>
  );
}
