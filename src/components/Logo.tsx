import Link from "next/link";

export default function Logo({ siteName }: { siteName: string }) {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label={siteName}>
      <img
        src="/brand/logo.svg"
        alt={siteName}
        className="h-9 md:h-10 w-auto object-contain"
      />
    </Link>
  );
}