import React from "react";
import Logo from "./Logo";
import { CustomLink } from "./CustomLink";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

const legalLinks = [
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Not a Broker", href: "/legal/not-broker" },
  { label: "AI Transparency", href: "/legal/ai-transparency" },
  { label: "Trust & Safety", href: "/legal/trust" },
];

const productLinks = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Start Transaction", href: "/signup" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:legal@cladex.io" },
];

export const Footer = () => {
  const socials = [
    {
      name: "twitter",
      icon: (
        <AiOutlineTwitter className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: "https://twitter.com/aceternitylabs",
    },
    {
      name: "LinkedIn",
      icon: (
        <AiOutlineLinkedin className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: "https://linkedin.com/in/manuarora28",
    },
    {
      name: "GitHub",
      icon: (
        <AiOutlineGithub className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: "https://github.com/aceternity",
    },
  ];
  return (
    <div className="border-t border-slate-900/5 py-10 max-w-6xl mx-auto px-8">
      <div className="flex flex-col justify-center items-center py-10 ">
        <Logo textClassName="text-black text-xl" />

        <div className="flex flex-col sm:flex-row justify-center gap-8 sm:gap-16 mt-8">
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-zinc-900 font-medium text-sm mb-3">Legal</p>
            {legalLinks.map((link, idx) => (
              <CustomLink
                key={`legal-${idx}`}
                href={link.href}
                className="text-zinc-500 text-sm relative"
              >
                <span className="relative z-10 px-2 py-2 inline-block">
                  {link.label}
                </span>
              </CustomLink>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-zinc-900 font-medium text-sm mb-3">Product</p>
            {productLinks.map((link, idx) => (
              <CustomLink
                key={`product-${idx}`}
                href={link.href}
                className="text-zinc-500 text-sm relative"
              >
                <span className="relative z-10 px-2 py-2 inline-block">
                  {link.label}
                </span>
              </CustomLink>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-zinc-900 font-medium text-sm mb-3">Company</p>
            {companyLinks.map((link, idx) => (
              <CustomLink
                key={`company-${idx}`}
                href={link.href}
                className="text-zinc-500 text-sm relative"
              >
                <span className="relative z-10 px-2 py-2 inline-block">
                  {link.label}
                </span>
              </CustomLink>
            ))}
          </div>
        </div>

        <p className="text-slate-500 text-sm font-light text-center mt-8 border-t border-zinc-100 pt-4">
          © 2025 Cladex. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs font-light text-center mt-2 max-w-xl mx-auto">
          Cladex provides structured transaction workflow tools. We are not a real estate broker, attorney, escrow provider, or financial advisor.
        </p>
        <div className="flex flex-row justify-center space-x-2 mt-2">
          {socials.map((socialLink: any, idx: number) => (
            <a
              key={`footer-link-${idx}`}
              href={socialLink.link}
              className="text-zinc-500 text-sm relative"
              target="__blank"
            >
              <span className="relative z-10 px-2 py-2 inline-block">
                {socialLink.icon}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
