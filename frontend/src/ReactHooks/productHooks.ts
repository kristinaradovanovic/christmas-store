import { useQuery } from "@tanstack/react-query";
import httpClient from "../httpClien";
import { Product } from "../types/Product";

export const useGetProductsQuery = () =>
useQuery({
 queryKey: ['products'],
 queryFn: async () =>
   (
     await httpClient.get<Product[]>(`api/products`)
   ).data,
})

