"use client";

import { CartItemWithProduct } from "@/lib/db/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface CartEntryProps {
  cartItem: CartItemWithProduct;
  setProductquantity: (productId: string, quantity: number)
   => Promise<void>;
}
const quantityOptions: JSX.Element[] = [];
for (let i = 1; i < 100; i++) {
  quantityOptions.push(
    <option value={i} key={i}>
      {i}
    </option>,
  );
}
export default function CartEntry({
  cartItem: { product, quantity },
  setProductquantity,
}: CartEntryProps) {
    const [isPending,startTransition]=useTransition()
  return (
    <div>
      <div className=" flex flex-wrap items-center gap-3">
        <Image
          src={product.imageURL}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
          <Link href={"/products/" + product.id} className="font-bold">
            {product.name}
          </Link>
          <div>Price : {formatPrice(product.price)}</div>
          <div className="my-1 flex items-center gap-2">
            Quantity :
            <select
              className="select   max-w-[80px]"
              defaultValue={quantity}
              onChange={(e) => {
                const newQuantity=parseInt(e.currentTarget.value)
                startTransition(async()=>{
                    await  setProductquantity(product.id,newQuantity)
                })
              }}
            >
                <option value="0" >
      remove
    </option>,
              {quantityOptions}
            </select>
          </div>
          <div className="flex items-center gap-3">
            total : {formatPrice(product.price * quantity)}
          {isPending&& <span className="loading loading-spinner loading-sm"></span>}
          </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
