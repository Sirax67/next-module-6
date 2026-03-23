'use client';

import { useState } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  description: string;
};

type Props = {
  product: Product;
  onDelete: (id: number) => void;
  onUpdate: (updatedProduct: Product) => void;
};

export default function ProductCard({ product, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(product);
  

  const handleSave = () => {
    onUpdate(editedProduct);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl  focus:border-blue-400 outline-none p-4">
        <input
          type="text"
          value={editedProduct.name}
          onChange={e => setEditedProduct({ ...editedProduct, name: e.target.value })}
          className="w-full border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none mb-2"
        />
        <input
          type="number"
          value={editedProduct.price}
          onChange={e => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
          className="w-full border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none mb-2"
        />
        <input
          type="text"
          value={editedProduct.imageSrc}
          onChange={e => setEditedProduct({ ...editedProduct, imageSrc: e.target.value })}
          className="w-full border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none mb-2"
        />
        <textarea
          value={editedProduct.description}
          onChange={e => setEditedProduct({ ...editedProduct, description: e.target.value })}
          className="w-full border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-2 focus:border-blue-400 outline-none mb-2 max-h-40 min-h-10"
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600" >
            Сохранить
          </button>
          <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-600">
            Отмена
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-2 border-blue-200 shadow-md shadow-blue-100 rounded-xl p-4  hover:shadow-blue-300 flex gap-5 items-center">
      <div className="">
        <img
          src={product.imageSrc}
          alt={product.name}
          className=" mb-4 rounded-xl"
        />
      </div>
      <div>
            <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.price.toLocaleString()} ₽</p>
      <p className="text-gray-500 text-sm mt-2 ">{product.description}</p>
      <div className="flex gap-2 mt-40">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl  hover:bg-orange-600 cursor-pointer"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 cursor-pointer"
        >
          Удалить
        </button>
      </div>
      
      </div>
    </div>
  );
}