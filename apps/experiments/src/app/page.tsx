import Link from "next/link"
import { Policy } from "@chronark/access-policies"

type Resources = {
  posts: ["read", "write", "all"]
}

const p = new Policy<Resources, `post-${number | "*"}`>({
  resources: {
    posts: {
      "post-*": ["all"],
    },
  },
})

export default function Page() {
  const r = p.validate("posts:write", "post-1")

  console.log(r)

  return (
    <div className="p-8 w-screen h-screen font-mono tabular-nums">
      <ul>
        <Link
          className="cursor-pointer hover:underline"
          href="/pricing-section"
        >
          <li>Pricing Section</li>
        </Link>
        <Link className="cursor-pointer hover:underline" href="/transactions">
          <li>Transactions Dashboard</li>
        </Link>
      </ul>
    </div>
  )
}
