import NextLink, { type LinkProps } from "next/link";

type Props = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: React.ReactNode;
  };

export default function TransitionLink(props: Props) {
  return <NextLink {...props} />;
}
