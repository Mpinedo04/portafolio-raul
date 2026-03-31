import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get('secret');

    // Comprobamos el token de seguridad (debes configurarlo en Vercel)
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const body = await req.json();
    const type = body?._type;

    console.log(`Revalidando contenido de tipo: ${type}`);

    // Revalidamos las rutas principales según el tipo de contenido cambiado
    revalidatePath('/', 'layout');
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
  }
}
