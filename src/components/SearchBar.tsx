"use client";

import { FormEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams(searchParams);
    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex min-w-0 w-full sm:min-w-[220px] sm:w-auto items-center gap-2 rounded-full border border-black/8 bg-white/80 px-3 py-2 shadow-[0_10px_25px_rgba(0,0,0,0.04)] backdrop-blur"
    >
      <Search className="h-4 w-4 text-[var(--muted)]" />
      <input
        id="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search..."
        className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
      />
    </form>
  );
};

export default SearchBar;
