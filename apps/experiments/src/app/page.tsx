import Link from "next/link"

export default function Page() {
  return (
    <div className="w-screen h-screen p-8 font-mono tabular-nums">
      <ul>
        <Link
          className="hover:underline cursor-pointer"
          href="/pricing-section"
        >
          <li>Pricing Section</li>
        </Link>
        <Link className="hover:underline cursor-pointer" href="/transactions">
          <li>Transactions Dashboard</li>
        </Link>
      </ul>
    </div>
  )
}
