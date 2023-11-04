import { formatPrice } from "@/lib/format"

interface priceTagProps{
    price:number,
    classname?:string
}

export default function PriceTag({price,classname}:priceTagProps) {
  return (
<span className={`badge ${classname}`}>
    {formatPrice(price)}
</span>
  )
}




















