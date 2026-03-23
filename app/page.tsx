'use client';

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';

const initialProducts = [
  {
    id: 1,
    name: 'Букет розовый',
    price: 2500,
    imageSrc: '/images/flower-2.jpg',
    description: 'Этот букет — воплощение нежности и элегантности.'
  },
  {
    id: 2,
    name: 'Букет весенний',
    price: 2700,
    imageSrc: '/images/flower-1.jpg',
    description: 'Маленькое очарование большого счастья.'
  },
  {
    id: 3,
    name: 'Букет праздничный',
    price: 2100,
    imageSrc: '/images/flower-3.jpg',
    description: 'Создан для того, чтобы принимать поздравления в самый важный день.'
  },
];

export default function CatalogPage() {
  const [products, setProducts] = useState(initialProducts);
  const [errors, setErrors] = useState<{name?: string; price?: string}>({});

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageSrc: '',
    description: '',
  });

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: {name?: string; price?: string} = {};
    if (!newProduct.name.trim()) {
      newErrors.name = 'Название обязательно';
    }
    if (!newProduct.price) {
      newErrors.price = 'Цена обязательна';
    } else if (Number(newProduct.price) <= 0) {
      newErrors.price = 'Цена должна быть больше 0';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    const productToAdd = {
      id: Date.now(), 
      name: newProduct.name,
      price: Number(newProduct.price),
      imageSrc: newProduct.imageSrc || '/images/default.jpg',
      description: newProduct.description,
    };

    setProducts([productToAdd, ...products]);

    setNewProduct({
      name: '',
      price: '',
      imageSrc: '',
      description: '',
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleUpdateProduct = (updatedProduct: any) => {
    setProducts(
      products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <div className="container mx-auto p-8 border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl text-blue-900">
      <h1 className="text-3xl font-bold mb-8">Каталог товаров</h1>

      <form onSubmit={handleAddProduct} className="mb-8 p-4 border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl">
        <h2 className="text-xl mb-4">Добавить товар</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              placeholder="Название *"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className='w-full'>
            <input
              type="number"
              placeholder="Цена *"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none w-full"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          
          <input
            type="text"
            placeholder="Ссылка на картинку"
            value={newProduct.imageSrc}
            onChange={e => setNewProduct({ ...newProduct, imageSrc: e.target.value })}
            className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none"
          />
          <textarea
            placeholder="Описание"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600 ">
          Добавить товар
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 place-items-center gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
            onUpdate={handleUpdateProduct}
          />
        ))}
      </div>
    </div>
  );
}