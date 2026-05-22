import { z } from "zod";

export type ProductType = {
  id: string | number;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

export type UserType = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  city?: string;
};

export type PublicUserType = Omit<UserType, "password">;

export type OrderType = {
  id: string;
  userId: string;
  items: CartItemsType;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentLast4: string;
  shippingDetails: ShippingFormInputs;
  createdAt: string;
};

export type WishlistStoreStateType = {
  productIds: Array<string | number>;
  hasHydrated: boolean;
};

export type WishlistStoreActionsType = {
  toggleWishlist: (productId: string | number) => boolean;
  isWishlisted: (productId: string | number) => boolean;
};

export type OrderStoreStateType = {
  orders: OrderType[];
  hasHydrated: boolean;
};

export type OrderStoreActionsType = {
  addOrder: (order: OrderType) => void;
};

export type AuthStoreStateType = {
  users: UserType[];
  currentUser: PublicUserType | null;
  hasHydrated: boolean;
};

export type AuthStoreActionsType = {
  signUp: (user: UserType) => { success: boolean; message: string };
  signIn: (email: string, password: string) => { success: boolean; message: string };
  signOut: () => void;
  updateCurrentUser: (data: Partial<PublicUserType>) => void;
};

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required!"),
  email: z.email().min(1, "Email is required!"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(12, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export const paymentFormSchema = z.object({
  cardHolder: z.string().min(1, "Card holder is required!"),
  cardNumber: z
    .string()
    .min(16, "Card Number is required!")
    .max(16, "Card Number is required!"),
  expirationDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "Expiration date must be in MM/YY format!"
    ),
  cvv: z.string().min(3, "CVV is required!").max(3, "CVV is required!"),
});

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
