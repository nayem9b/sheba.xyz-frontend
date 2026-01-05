"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

export function GlobalLoadingBar() {
  const isLoading = useAppSelector((state) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 border-r-blue-600 rounded-full animate-spin"></div>
        </div>

        {/* Animated Flowing Lines */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full"
              style={{
                height: "24px",
                animation: `flow 1.2s ease-in-out ${i * 0.1}s infinite`,
              }}
            ></div>
          ))}
        </div>

        {/* Loading Text */}
        <p className="text-white font-semibold text-sm tracking-widest">
          <span className="inline-block animate-pulse">L</span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.1s" }}
          >
            O
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.2s" }}
          >
            A
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.3s" }}
          >
            D
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.4s" }}
          >
            I
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            N
          </span>
          <span
            className="inline-block animate-pulse"
            style={{ animationDelay: "0.6s" }}
          >
            G
          </span>
        </p>
      </div>

      <style>{`
        @keyframes flow {
          0%, 100% {
            height: 24px;
            opacity: 0.4;
          }
          50% {
            height: 40px;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
