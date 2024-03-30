import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

// export const GET = async ({params}: {params: {id: string}}) => {
//   try {
//     const specificProduct = await prisma.product.findUnique({
//       where: {
//         id: Number(params.id)
//       },
//     });

//     if (specificProduct) {
//       return new Response(JSON.stringify(specificProduct), {
//         status: 200,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     } else {
//       return new Response(JSON.stringify({ message: "Product not found" }), {
//         status: 404,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//     return new Response(JSON.stringify({ message: "Internal server error" }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   }
// }

export const PATCH = async (request: Request, {params}: {params: {id: string}}) => {
  const body: Product = await request.json();
  const product = await prisma.product.update({
    where: {
      id: Number(params.id)
    },
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId
    }
  });
  return NextResponse.json(product, {status: 201});
};

export const DELETE = async (request: Request, {params}: {params: {id: string}}) => {
  const product = await prisma.product.delete({
    where: {
      id: Number(params.id)
    } 
  });
  return NextResponse.json(product, {status: 201});
}