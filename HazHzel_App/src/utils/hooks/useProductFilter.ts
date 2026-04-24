"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

export const useProductFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | number | null, isMultiple = false) => {
      const current = new URLSearchParams(searchParams);

      if (value === null) {
        current.delete(key);
      } else {
        if (isMultiple) {
          const currentValues = current.get(key)?.split(",") || [];
          const strValue = String(value);

          if (currentValues.includes(strValue)) {
            const newValues = currentValues.filter((v) => v !== strValue);
            if (newValues.length > 0) {
              current.set(key, newValues.join(","));
            } else {
              current.delete(key);
            }
          } else {
            currentValues.push(strValue);
            current.set(key, currentValues.join(","));
          }
        } else {
          current.set(key, String(value));
        }
      }

      current.set("current", "1");

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );
  const updateParams = useCallback(
    (updates: { key: string; value: string | number | null }[]) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      updates.forEach(({ key, value }) => {
        if (value === null || value === undefined || value === "") {
          current.delete(key);
        } else {
          current.set(key, String(value));
        }
      });

      current.set("current", "1");

      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return { updateFilter, updateParams, searchParams, pathname };
};
