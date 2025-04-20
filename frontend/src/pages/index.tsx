import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a mi tienda</h1>
      <Link href="/products">Ver productos</Link>
    </div>
  );
}