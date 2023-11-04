import NotFound from "@/app/not-found";
import PriceTag from "@/components/PriceTag";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import { Metadata } from "next";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface productPageProps {
  params: {
    id: string;
  };
}
const getProduct=cache(async(id:string)=>{
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) NotFound();
    return product
})
export async function generateMetadta({ 
    params: { id },
  }: productPageProps
  ):Promise<Metadata> {
    const product=await getProduct(id)
    return{
        title:product?.name+" flowmazon",
        description:product?.description,
        openGraph:{
            images:[{url:product.imageURL}]
        }
}
  }

export default async function ProductPage({
  params: { id },
}: productPageProps) {
const product=await getProduct(id)
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={product.imageURL}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold ">{product?.name}</h1>
     <PriceTag price={product.price} classname="mt-4"/>
      <p className="py-6">{product?.description}</p>
      <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
      </div>
    </div>
  );
}
