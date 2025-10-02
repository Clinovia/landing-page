// components/CTAButton.tsx
import Link from "next/link";

interface CTAButtonProps {
  href: string;
  text: string;
  primary?: boolean;
}

export default function CTAButton({ href, text, primary = true }: CTAButtonProps) {
  const baseClasses = "px-6 py-3 rounded-lg shadow transition";
  const primaryClasses = "bg-indigo-600 text-white hover:bg-indigo-700";
  const secondaryClasses = "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50";

  return (
    <Link href={href} className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}>
      {text}
    </Link>
  );
}
