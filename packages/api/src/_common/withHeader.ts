/* eslint-disable @typescript-eslint/no-explicit-any */

export const withHeader = (token: string, options?: any) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    ...options,
  } as any;
};
