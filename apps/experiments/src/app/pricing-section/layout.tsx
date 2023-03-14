import Link from "next/link"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <nav className="px-8 py-4 items-center flex justify-center">
        <Link href="/" className="hover:underline font-mono">
          back home
        </Link>
      </nav>
      {children}
    </>
  )
}
