"use client";

import React from "react";
import { GridPattern } from "@components/GridPattern";

const pattern = {
  y: -6,
  squares: [
    [-1, 2],
    [1, 3],
    ...Array.from({ length: 10 }, () => [
      Math.floor(Math.random() * 20) - 10,
      Math.floor(Math.random() * 20) - 10,
    ]),
  ],
};

export function AboutHeroSection() {
  return (
    <div className="px-4">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={120}
          height={120}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-5deg] fill-tertiary/[0.05] stroke-gray-100 dark:fill-primary dark:stroke-gray-100"
          {...pattern}
        />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto mt-32">
        <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium text-center mb-4">
          ABOUT CLADEX
        </p>
        <h1 className="font-semibold text-4xl sm:text-7xl text-center max-w-5xl mx-auto leading-tight tracking-tight">
          <span className="text-zinc-800">AI-Powered</span>
          <br />
          <span className="text-primary">Real Estate Transaction Intelligence</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl tracking-tight text-zinc-600 text-center leading-normal">
          Cladex is a modern real estate transaction management platform designed to help buyers, sellers, investors, and property professionals organize and analyze real estate deals more efficiently.
        </p>
      </div>
    </div>
  );
}
