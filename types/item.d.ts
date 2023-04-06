interface CartItem {
  id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
}

interface PriceObject {
  created: number;
  id: string;
  product: Product;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

interface Product {
  default_price: string;
  description: string;
  id: string;
  images: string[];
  metadata: {
    category: string;
  };
  name: string;
  created: string;
  updated: string;
}
