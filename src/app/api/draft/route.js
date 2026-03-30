import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  // Habilitamos el modo borrador (Draft Mode) de Next.js
  (await draftMode()).enable();

  // Redirigimos a la página solicitada o al inicio por defecto
  if (slug) {
    redirect(`/${slug}`);
  } else {
    redirect('/');
  }
}
