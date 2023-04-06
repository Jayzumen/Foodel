import { cart, users } from "@/db/schema";
import { InferModel } from "drizzle-orm";

type User = InferModel<typeof users>;
type Cart = InferModel<typeof cart>;
