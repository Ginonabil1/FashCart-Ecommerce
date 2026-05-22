"use client";

import { Suspense, useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Package, UserRound } from "lucide-react";
import { products } from "@/lib/products";
import { toast } from "react-toastify";

const tabs = [
  { id: "profile", label: "Profile", icon: <UserRound className="h-4 w-4" /> },
  { id: "wishlist", label: "Wishlist", icon: <Heart className="h-4 w-4" /> },
  { id: "orders", label: "Orders", icon: <Package className="h-4 w-4" /> },
];

const ProfilePageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const {
    currentUser,
    updateCurrentUser,
    hasHydrated,
    orders,
    wishlistProductIds,
    toggleWishlist,
  } = useAppContext();

  const wishlistProducts = useMemo(
    () => products.filter((product) => wishlistProductIds.includes(product.id)),
    [wishlistProductIds]
  );

  const userOrders = useMemo(
    () =>
      currentUser
        ? orders.filter((order) => order.userId === currentUser.id)
        : [],
    [currentUser, orders]
  );

  if (hasHydrated && !currentUser) {
    return (
      <div className="mx-auto mt-16 max-w-3xl rounded-[2rem] border border-black/5 bg-white/80 p-10 text-center shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl text-black">
          Sign in to access your profile
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          Your saved details, wishlist, and order history are available once
          you sign in.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-flex rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div className="mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[0.28fr_0.72fr]">
      <aside className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
          Account hub
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl text-black">
          {currentUser.fullName}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">{currentUser.email}</p>
        <div className="mt-8 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => router.push(`/profile?tab=${tab.id}`)}
              className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-[#171717] text-white"
                  : "bg-[#f7f2e8] text-[var(--muted)]"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </aside>

      <section className="rounded-[2rem] border border-black/5 bg-white/80 p-8 shadow-[0_18px_50px_rgba(0,0,0,0.06)]">
        {activeTab === "profile" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Saved information
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                Profile details
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm">
                <span className="font-medium text-gray-700">Full name</span>
                <input
                  defaultValue={currentUser.fullName}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                  onBlur={(event) =>
                    updateCurrentUser({ fullName: event.target.value })
                  }
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-gray-700">Email</span>
                <input
                  defaultValue={currentUser.email}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                  onBlur={(event) =>
                    updateCurrentUser({ email: event.target.value })
                  }
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-gray-700">Phone</span>
                <input
                  defaultValue={currentUser.phone || ""}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                  onBlur={(event) =>
                    updateCurrentUser({ phone: event.target.value })
                  }
                />
              </label>
              <label className="space-y-2 text-sm">
                <span className="font-medium text-gray-700">City</span>
                <input
                  defaultValue={currentUser.city || ""}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                  onBlur={(event) =>
                    updateCurrentUser({ city: event.target.value })
                  }
                />
              </label>
            </div>
            <label className="block space-y-2 text-sm">
              <span className="font-medium text-gray-700">Address</span>
              <input
                defaultValue={currentUser.address || ""}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
                onBlur={(event) =>
                  updateCurrentUser({ address: event.target.value })
                }
              />
            </label>
            <button
              type="button"
              onClick={() => toast.success("Profile details updated.")}
              className="rounded-full bg-[#171717] px-5 py-3 text-sm font-semibold text-white"
            >
              Save updates
            </button>
          </div>
        )}

        {activeTab === "wishlist" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Saved products
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                Wishlist
              </h2>
            </div>
            {wishlistProducts.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                You have not saved any items yet.
              </p>
            ) : (
              <div className="space-y-4">
                {wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-4"
                  >
                    <div>
                      <p className="font-semibold text-black">{product.name}</p>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        ${product.price.toFixed(2)} • {product.category}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-black"
                      >
                        View
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          toggleWishlist(product.id);
                          toast.info(`${product.name} removed from wishlist`);
                        }}
                        className="rounded-full bg-rose-100 px-4 py-2 text-sm font-medium text-rose-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--muted)]">
                Purchase history
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-black">
                Orders
              </h2>
            </div>
            {userOrders.length === 0 ? (
              <p className="text-sm text-[var(--muted)]">
                No orders yet. Complete checkout while signed in to see your
                purchases here.
              </p>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-gray-200 px-5 py-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-black">
                          Order #{order.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-[var(--muted)]">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-black">
                        ${order.total.toFixed(2)}
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-[var(--muted)]">
                      {order.items.map((item) => (
                        <p key={`${order.id}-${item.id}-${item.selectedColor}-${item.selectedSize}`}>
                          {item.quantity}x {item.name} • {item.selectedSize} •{" "}
                          {item.selectedColor}
                        </p>
                      ))}
                    </div>
                    <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                      Paid with card ending {order.paymentLast4}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <Suspense
      fallback={<div className="mt-12 text-sm text-[var(--muted)]">Loading profile...</div>}
    >
      <ProfilePageContent />
    </Suspense>
  );
};

export default ProfilePage;
