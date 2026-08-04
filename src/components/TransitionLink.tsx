"use client";

import NextLink, { type LinkProps } from "next/link";
import { useTransitionNav } from "./PageTransition";

type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: React.ReactNode;
  };

/**
 * Drop-in replacement for next/link that plays the page-transition curtain
 * for internal navigations. Swap the import (`from "next/link"` →
 * `from "@/components/TransitionLink"`) and every <Link> transitions.
 * External links, new-tab, modified clicks, and hash links fall through to
 * the browser / Next default untouched.
 */
export default function TransitionLink({ href, onClick, target, ...rest }: Props) {
  const { navigate } = useTransitionNav();
  const hrefStr = typeof href === "string" ? href : null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Only intercept plain left-clicks on same-tab internal path links.
    if (
      !hrefStr ||
      !hrefStr.startsWith("/") ||
      hrefStr.startsWith("//") ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      (target && target !== "_self")
    ) {
      return;
    }
    e.preventDefault();
    navigate(hrefStr);
  };

  return (
    <NextLink href={href} target={target} onClick={handleClick} {...rest} />
  );
}
