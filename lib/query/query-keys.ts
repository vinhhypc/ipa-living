/**
 * Central registry of query keys. Keeping them here avoids typos and makes
 * cache invalidation (`queryClient.invalidateQueries({ queryKey: qk.xxx })`)
 * discoverable from one place.
 */
export const qk = {
  towers: () => ["towers"] as const,
  tower: (slug: string) => ["towers", slug] as const,
  workshops: (params?: Record<string, unknown>) =>
    params ? (["workshops", params] as const) : (["workshops"] as const),
  workshop: (slug: string) => ["workshops", slug] as const,
};
