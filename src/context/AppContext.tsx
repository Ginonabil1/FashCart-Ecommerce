"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CartItemType,
  CartItemsType,
  OrderType,
  PublicUserType,
  ShippingFormInputs,
  UserType,
} from "@/types";

type AppContextValue = {
  hasHydrated: boolean;
  cart: CartItemsType;
  users: UserType[];
  currentUser: PublicUserType | null;
  wishlistProductIds: Array<string | number>;
  orders: OrderType[];
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
  signUp: (user: UserType) => { success: boolean; message: string };
  signIn: (email: string, password: string) => { success: boolean; message: string };
  signOut: () => void;
  updateCurrentUser: (data: Partial<PublicUserType>) => void;
  toggleWishlist: (productId: string | number) => boolean;
  isWishlisted: (productId: string | number) => boolean;
  addOrder: (order: OrderType) => void;
  getDefaultShippingDetails: () => ShippingFormInputs | undefined;
};

const AppContext = createContext<AppContextValue | null>(null);

const AUTH_STORAGE_KEY = "vibecart-auth";
const CART_STORAGE_KEY = "vibecart-cart";
const WISHLIST_STORAGE_KEY = "vibecart-wishlist";
const ORDER_STORAGE_KEY = "vibecart-orders";

const toPublicUser = (user: UserType): PublicUserType => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  address: user.address,
  city: user.city,
});

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [cart, setCart] = useState<CartItemsType>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [currentUser, setCurrentUser] = useState<PublicUserType | null>(null);
  const [wishlistProductIds, setWishlistProductIds] = useState<
    Array<string | number>
  >([]);
  const [orders, setOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const authState = readStorage<{
      users: UserType[];
      currentUser: PublicUserType | null;
    }>(AUTH_STORAGE_KEY, {
      users: [],
      currentUser: null,
    });

    setUsers(authState.users);
    setCurrentUser(authState.currentUser);
    setCart(readStorage<CartItemsType>(CART_STORAGE_KEY, []));
    setWishlistProductIds(
      readStorage<Array<string | number>>(WISHLIST_STORAGE_KEY, [])
    );
    setOrders(readStorage<OrderType[]>(ORDER_STORAGE_KEY, []));
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ users, currentUser })
    );
  }, [users, currentUser, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistProductIds)
    );
  }, [wishlistProductIds, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) return;
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
  }, [orders, hasHydrated]);

  const value = useMemo<AppContextValue>(
    () => ({
      hasHydrated,
      cart,
      users,
      currentUser,
      wishlistProductIds,
      orders,
      addToCart: (product) => {
        setCart((prevCart) => {
          const existingIndex = prevCart.findIndex(
            (p) =>
              p.id === product.id &&
              p.selectedSize === product.selectedSize &&
              p.selectedColor === product.selectedColor
          );

          if (existingIndex !== -1) {
            const updatedCart = [...prevCart];
            updatedCart[existingIndex].quantity += product.quantity || 1;
            return updatedCart;
          }

          return [
            ...prevCart,
            {
              ...product,
              quantity: product.quantity || 1,
              selectedSize: product.selectedSize,
              selectedColor: product.selectedColor,
            },
          ];
        });
      },
      removeFromCart: (product) => {
        setCart((prevCart) =>
          prevCart.filter(
            (p) =>
              !(
                p.id === product.id &&
                p.selectedSize === product.selectedSize &&
                p.selectedColor === product.selectedColor
              )
          )
        );
      },
      clearCart: () => setCart([]),
      signUp: (user) => {
        const existingUser = users.find(
          (storedUser) =>
            storedUser.email.toLowerCase() === user.email.toLowerCase()
        );

        if (existingUser) {
          return {
            success: false,
            message: "An account with this email already exists.",
          };
        }

        setUsers((prevUsers) => [...prevUsers, user]);
        setCurrentUser(toPublicUser(user));
        return { success: true, message: "Account created successfully." };
      },
      signIn: (email, password) => {
        const existingUser = users.find(
          (storedUser) =>
            storedUser.email.toLowerCase() === email.toLowerCase() &&
            storedUser.password === password
        );

        if (!existingUser) {
          return { success: false, message: "Invalid email or password." };
        }

        setCurrentUser(toPublicUser(existingUser));
        return { success: true, message: "Signed in successfully." };
      },
      signOut: () => setCurrentUser(null),
      updateCurrentUser: (data) => {
        setCurrentUser((prevCurrentUser) =>
          prevCurrentUser ? { ...prevCurrentUser, ...data } : prevCurrentUser
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === currentUser?.id ? { ...user, ...data } : user
          )
        );
      },
      toggleWishlist: (productId) => {
        const exists = wishlistProductIds.includes(productId);
        setWishlistProductIds((prevIds) =>
          exists ? prevIds.filter((id) => id !== productId) : [...prevIds, productId]
        );
        return !exists;
      },
      isWishlisted: (productId) => wishlistProductIds.includes(productId),
      addOrder: (order) => setOrders((prevOrders) => [order, ...prevOrders]),
      getDefaultShippingDetails: () =>
        currentUser
          ? {
              name: currentUser.fullName || "",
              email: currentUser.email || "",
              phone: currentUser.phone || "",
              address: currentUser.address || "",
              city: currentUser.city || "",
            }
          : undefined,
    }),
    [
      hasHydrated,
      cart,
      users,
      currentUser,
      wishlistProductIds,
      orders,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
