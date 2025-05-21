export const cacheTTL = {
  customer: 60 * 5, // 5 minutes
  contact: 60 * 10, // 10 minutes
};

export const cacheKey = {
  customer: (id: string) => `customer:${id}`,
  contact: (id: string) => `contact:${id}`,
}