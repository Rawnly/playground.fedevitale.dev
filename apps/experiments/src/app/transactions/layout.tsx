import Link from "next/link"
import { Text, Title } from "@tremor/react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="px-8 py-4 items-center flex justify-center">
        <Link href="/" className="hover:underline font-mono">
          back home
        </Link>
      </nav>
      <main className="p-8">
        <Title>Dashboard</Title>
        <Text>Review expanses</Text>
        <div className="mt-6">{children}</div>
      </main>
    </>
  )
}
