import { Product } from '../models/product';

interface Props {
  items: Product[];
}

export default function ProductList({ items }: Props) {
  if (!items.length) return <p>No hay productos.</p>;

  return (
    <ul>
      {items.map((product) => (
        <li key={product.id}>
          <strong>{product.name}</strong> - ${product.stock}
        </li>
      ))}
    </ul>
  );
}
