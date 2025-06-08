import { useEffect, useState } from "react";
import { MockRepository } from "../../../../dev/mockRepository";
import { Link } from "react-router-dom";
import { IProduct } from "../../../domain/IProduct";

const dummyProductRepository = new MockRepository();

export default function ProductListPage() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const productList = dummyProductRepository.getAll();
    setProducts(productList);
  }, []);

  return (
    <>
      <h1>Products</h1>
      <button>商品を追加する</button>
      <table>
        <thead>
          <tr>
            <th>商品ID</th>
            <th>商品名</th>
            <th>単価</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <Link to={`/inventory/products/${product.id}`}>詳細</Link>
              </td>
              <td>
                <button>更新・削除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
