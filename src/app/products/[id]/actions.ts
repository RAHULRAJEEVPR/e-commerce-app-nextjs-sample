"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import {revalidatePath} from "next/cache"
export async function incrementProductQuantity(productId: string) {
  
    const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find((item) => item.productId === productId);

if(articleInCart){
    await prisma.cartItems.update({
        where:{id: articleInCart.id},
        data:{quantity:{increment:1}}
    })
}else{
    await prisma.cartItems.create({
        data:{cartId:cart.id,
        productId,
    quantity:1}
    })
}
console.log("aaayo");

revalidatePath("/products/[id]")
}
