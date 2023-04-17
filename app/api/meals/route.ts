import { prisma } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();

  const cartData = await prisma.cart.findFirst({
    where: {
      userId: userId!,
    },
  });

  const cartProducts = await prisma.cartProduct.findMany({
    where: {
      cartId: cartData?.id,
    },
  });

  return NextResponse.json(cartProducts);
}

export async function POST(req: Request) {
  const { userId } = auth();
  const { id, name, image, price }: CartItem = await req.json();

  const productData = {
    id: id,
    name: name,
    image: image,
    price: Number(price),
    quantity: 1,
  };

  try {
    const cartData = await prisma.cart.findUnique({
      where: {
        userId: userId!,
      },
    });

    let cartProduct;

    const cartProductData = await prisma.cartProduct.findFirst({
      where: {
        cartId: cartData?.id,
        productId: productData.id,
      },
    });

    if (cartData) {
      if (cartProductData) {
        cartProduct = await prisma.cartProduct.update({
          where: {
            id: cartProductData.id,
          },
          data: {
            quantity: cartProductData.quantity + 1,
          },
        });
      } else {
        cartProduct = await prisma.cartProduct.create({
          data: {
            cartId: cartData.id,
            productId: productData.id,
            name: productData.name,
            image: productData.image,
            price: productData.price,
            quantity: productData.quantity,
          },
        });
      }

      await prisma.cart.update({
        where: {
          id: cartData.id,
        },
        data: {
          products: {
            connect: {
              cartId_productId: {
                cartId: cartData.id,
                productId: productData.id,
              },
            },
          },
        },
      });
    } else {
      const cart = await prisma.cart.create({
        data: {
          userId: userId!,
          products: {},
        },
      });

      cartProduct = await prisma.cartProduct.create({
        data: {
          cartId: cart.id,
          productId: productData.id,
          name: productData.name,
          image: productData.image,
          price: productData.price,
          quantity: productData.quantity,
        },
      });

      await prisma.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          products: {
            connect: {
              ...cartProduct,
            },
          },
        },
      });
    }

    return NextResponse.json("success");
  } catch (error) {
    console.log(error);
  }
}
