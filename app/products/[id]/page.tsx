import { PrismaClient } from "@prisma/client";
import { format, formatDate } from "date-fns";
import Link from "next/link";
const prisma = new PrismaClient();

const getProductById = async ({params}: {params: {id: string}}) => {
  const product = await prisma.product.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      brand: true
    }
  });
  return product;
}


export default async function SpecificProduct({params}: {params: {id: string}}) {
  const specificProduct = await getProductById({params})
  

  return (
    <div className="flex flex-col text-center">
      {specificProduct ? (
        <div>
          <h1>{specificProduct.title}</h1>
          <p>Price: {specificProduct.price}</p>
          <p>Brand: {specificProduct.brand.name}</p>
          <p>Updated at: {formatDate(specificProduct.updatedAt, "MMMM dd yyyy")}</p>
          <p>Created at: {formatDate(specificProduct.createdAt, "MMMM dd yyyy")}</p>
        </div>
      ) : (
        <p>Product not found</p>
      )}
      <Link href={`/products`} className="bg-black w-20 mx-auto text-white rounded">Back</Link>
    </div>
  )
}
