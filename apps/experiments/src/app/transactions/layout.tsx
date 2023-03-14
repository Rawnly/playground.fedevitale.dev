import { Text, Title } from "@tremor/react"

export default function Layout({ children }) {
  return (
    <main className="p-8">
      <Title>Dashboard</Title>
      <Text>Review expanses</Text>
      <div className="mt-6">{children}</div>
    </main>
  )
}
