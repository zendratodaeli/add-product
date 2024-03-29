import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();

const getProductById = async ({params}: {params: {id: string}}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: {
        select: {
          name: true,
        },
      },
      updatedAt: true,
      createdAt: true
    },
  });
  return product;
}


export default async function SpecificProduct({params}: {params: {id: string}}) {
  const specificProduct = await getProductById({params})

  const formatDate = (dateString: string | number | Date | undefined | null) => {
    if (!dateString) {
      // Handle the case where dateString is undefined, null, or otherwise falsy
      return "Unknown date";
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // Check if the date is invalid
      return "Invalid date";
    }
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: false 
    };
    return new Intl.DateTimeFormat('default', options).format(date);
  };
  

  return (
    <div className="flex flex-col text-center">
      {specificProduct ? (
        <div>
          <h1>{specificProduct.title}</h1>
          <p>Price: {specificProduct.price}</p>
          <p>Brand: {specificProduct.brand.name}</p>
          <p>Updated at: {formatDate(specificProduct.updatedAt)}</p>
          <p>Created at: {formatDate(specificProduct.createdAt)}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
      <Link href={`/products`} className="bg-black w-20 mx-auto text-white rounded">Back</Link>
    </div>
  )
}
