"use client";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useTeachersData = () => {
  const { data, error, mutate } = useSWR(`${API_URL}/api/teachers`, fetcher);
  return { data, error, isLoading: !data && !error, mutate };
};

export const useNoticesData = () => {
  const { data, error, mutate } = useSWR(`${API_URL}/api/notices`, fetcher);
  return { data, error, isLoading: !data && !error, mutate };
};

export const useStudentsData = () => {
  const { data, error, mutate } = useSWR(`${API_URL}/api/students`, fetcher);
  return { data, error, isLoading: !data && !error, mutate };
};