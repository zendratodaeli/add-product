"use client"
import { SyntheticEvent, useState } from "react"
import { Brand } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
} 

export default function UpdateProduct({brands, product}: {brands: Brand[]; product: Product}  ) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brandId);

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.patch(`/api/products/${product.id}`, {
      title: title,
      price: Number(price),
      brandId: Number(brand)
    });
    router.refresh();
    setIsOpen(false)
  }

  const handleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>Edit</button>

      <div className={isOpen ? 'modal modal-open' : 'modal'}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update {product.title}</h3>

          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label font bold">Product Name</label>
              <input 
                type="text" 
                className="input input-bordered" 
                placeholder='Product Name' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="form-control w-full">
              <label className="label font bold">Price</label>
              <input 
                type="text" 
                className="input input-bordered" 
                placeholder='Price' 
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                />
            </div>

            <div className="form-control w-full">
              <label className="label font bold">Brand</label>
              <select 
                className="select select-bordered"
                value={brand}
                onChange={(e) => setBrand(Number(e.target.value))}
              >
                {brands.map((brand) => (
                  <option value={brand.id} key={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>  

            <div className="modal-action">
              <button type='button' className='btn' onClick={handleModal}>Close</button>
              <button type='submit' className='btn btn-primary'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
