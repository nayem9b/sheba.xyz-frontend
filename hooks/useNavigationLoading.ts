"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setLoading } from "@/redux/slices/loadingSlice";

export function useNavigationLoading() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
    }
  }, [isPending, dispatch]);

  // Override router.push to use startTransition
  useEffect(() => {
    const originalPush = router.push;
    
    router.push = function (...args: any[]) {
      startTransition(() => {
        originalPush.apply(router, args);
      });
    } as any;
  }, [router]);
}
