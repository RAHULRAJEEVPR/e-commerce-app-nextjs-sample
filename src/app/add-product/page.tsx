import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "add Product -Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageURL = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price")) || 0;

  if (!name || !description || !imageURL || !price) {
    throw new Error("All fields are required");
  }

  await prisma.product.create({
    data: { name, description, imageURL, price },
  });
  redirect("/")
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);
    if(!session){
        redirect("/api/auth/signin?callbackUrl=/add-product")
    }
  return (
    <div>
      <h1 className="text-lg mb-3 font-bold">add product</h1>
      <form action={addProduct}>
        <input
          type="text"
          className="mb-3 w-full input input-bordered"
          required
          name="name"
          placeholder="Name"
        />
        <textarea
          required
          name="description"
          placeholder="Dexcription"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>
        <input
          type="url"
          className="mb-3 w-full input input-bordered"
          required
          name="imageUrl"
          placeholder="image URL"
        />
        <input
          type="number"
          className="mb-3 w-full input input-bordered"
          required
          name="price"
          placeholder="price"
        />
        <FormSubmitButton type="submit" className="btn btn-primary btn-block">
          Add product
        </FormSubmitButton>
      </form>
    </div>
  );
}
