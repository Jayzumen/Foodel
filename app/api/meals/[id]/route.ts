import { prisma } from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const userCart = await prisma.cart.findFirst({
    where: {
      userId: user?.email!,
    },
  });

  const cartProduct = await prisma.cartProduct.findFirst({
    where: {
      cartId: userCart?.id,
      productId: params.id,
    },
  });

  return NextResponse.json(cartProduct);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const quantity: number = await req.json();

  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        userId: user?.email!,
      },
    });

    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart?.id,
        productId: params.id,
      },
    });

    if (cartProduct) {
      await prisma.cartProduct.update({
        where: {
          id: cartProduct.id,
        },
        data: {
          quantity: quantity,
        },
      });
    }

    return NextResponse.json("Product added to cart");
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        userId: user?.email!,
      },
    });

    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        cartId: userCart?.id,
        productId: params.id,
      },
    });

    await prisma.cartProduct.delete({
      where: {
        id: cartProduct?.id,
      },
    });

    return NextResponse.json("Product deleted from cart");
  } catch (error) {
    console.log(error);
  }
}
