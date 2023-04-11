import { auth } from "@clerk/nextjs/app-beta";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { userId } = auth();
}
