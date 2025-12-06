import { temas } from '@/data/temas';
import Link from 'next/link';
import SequenceJourney from '@/components/layout/SequenceJourney';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const tema = temas.find((t) => t.slug === slug);

  if (!tema) {
    return {
      title: 'Tema no encontrado',
    };
  }

  const coverImage = tema.secuencia.find(item => item.tipo === 'imagen')?.src || '/icon-512.png';

  return {
    title: `${tema.titulo} | Espiritualia`,
    description: tema.descripcion,
    openGraph: {
      title: `${tema.titulo} - Espiritualia`,
      description: tema.descripcion,
      images: [
        {
          url: coverImage,
          width: 800,
          height: 600,
          alt: tema.titulo,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: tema.titulo,
      description: tema.descripcion,
      images: [coverImage],
    },
  };
}

export default function TemaPage({ params }) {
  const { slug } = params;
  const tema = temas.find((t) => t.slug === slug);

  if (!tema) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <h1>Tema no encontrado</h1>
        <p>El tema que buscas no existe.</p>
        <Link href="/">Volver al inicio</Link>
      </div>
    );
  }

  return (
    <main style={{ height: '100%', width: '100%' }}>
      <SequenceJourney secuencia={tema.secuencia} currentSlug={slug} />
    </main>
  );
}

// Esta función le dice a Next.js qué páginas debe generar en el momento de la compilación.
export async function generateStaticParams() {
  return temas.map((tema) => ({
    slug: tema.slug,
  }));
}
