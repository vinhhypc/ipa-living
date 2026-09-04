"use client";

import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api/axios";
import { qk } from "@/lib/query/query-keys";

/**
 * Example data hook — replace the endpoint/shape with the real API when ready.
 * Delete this file if you prefer to start from scratch; it only demonstrates
 * the axios + react-query wiring.
 */
export type Workshop = {
  slug: string;
  title: string;
};

export function useWorkshops() {
  return useQuery({
    queryKey: qk.workshops(),
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Workshop[]>("/workshops", { signal });
      return data;
    },
  });
}
