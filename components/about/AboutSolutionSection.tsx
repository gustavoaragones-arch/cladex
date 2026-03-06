"use client";

import { useMotionValue } from "framer-motion";
import React from "react";
import { AiFillPieChart, AiOutlineTeam } from "react-icons/ai";
import { BsBarChartFill, BsServer } from "react-icons/bs";
import { GiLockSpy } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { CardPattern } from "@components/CardPattern";

const solutionCards = [
  {
    title: "Transaction Workflow Management",
    description:
      "Track every step of a property deal from initial offer to closing. Structured stages ensure nothing is missed.",
    icon: <AiFillPieChart className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    title: "AI-Powered Real Estate Insights",
    description:
      "AI tools highlight risks, summarize documents, and identify important transaction details — as decision-support tools, not decision makers.",
    icon: <BsBarChartFill className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    title: "Document Organization",
    description:
      "Store and organize contracts, disclosures, inspection reports, and financial documents in one secure location.",
    icon: <GiLockSpy className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    title: "Collaboration Tools",
    description:
      "Coordinate with buyers, sellers, attorneys, inspectors, lenders, and advisors — all within a single transaction workspace.",
    icon: <AiOutlineTeam className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    title: "Transaction Risk Indicators",
    description:
      "Automated alerts help identify potential issues before they impact a deal. Stay proactive throughout the transaction.",
    icon: <BsServer className="text-primary h-4 w-4 relative z-50" />,
  },
  {
    title: "Built for Transparency",
    description:
      "Clear AI transparency policies, privacy-first data handling, secure cloud infrastructure, and full user control over transaction data.",
    icon: <MdDarkMode className="text-primary h-4 w-4 relative z-50" />,
  },
];

function IconContainer({ icon }: { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-primary/50 transform rounded-md blur-lg" />
      <div className="h-10 w-10 rounded-2xl backdrop-blur-sm flex items-center justify-center bg-white bg-grid-extrasmall-zinc-200 overflow-hidden">
        {icon}
        <div className="absolute inset-0 bg-white [mask-image:linear-gradient(to_bottom,transparent,white_4rem,white_calc(100%-4rem),transparent)] z-40" />
      </div>
    </div>
  );
}

function Card({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start">
      <IconContainer icon={icon} />
      <div className="mt-8">
        <h2 className="text-white text-2xl">{title}</h2>
        <p className="text-sm text-zinc-100 mt-8 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export function AboutSolutionSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

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

  return (
    <div
      className="px-4 bg-zinc-900 py-20 md:py-40 relative group"
      onMouseMove={onMouseMove}
    >
      <div className="absolute w-96 h-96 -left-20 -top-20 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf] blur-3xl rounded-full opacity-20" />
      <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
        <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
          The Cladex Solution
        </h2>
        <p className="mt-6 text-lg tracking-tight text-blue-100 max-w-xl mx-auto">
          Cladex provides structured transaction management software for real estate deals.
        </p>
        <p className="mt-4 text-lg tracking-tight text-blue-100 max-w-xl mx-auto">
          The platform helps users organize every stage of a property transaction in a single digital workspace.
        </p>
      </div>

      <CardPattern {...pattern} mouseX={mouseX} mouseY={mouseY} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto gap-20 my-20 md:my-40 px-4">
        {solutionCards.map((card, idx) => (
          <Card
            key={idx}
            title={card.title}
            description={card.description}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}
