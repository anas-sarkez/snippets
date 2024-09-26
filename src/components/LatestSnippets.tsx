import React from "react"
import { useQuery } from "react-query"
import axios from "redaxios"
import { Snippet } from "fake-snippets-api/lib/db/schema"
import { Link } from "wouter"

export const LatestSnippets: React.FC = () => {
  const {
    data: snippets,
    isLoading,
    error,
  } = useQuery<Snippet[]>("latestSnippets", async () => {
    const response = await axios.get("/api/snippets/list_newest")
    return response.data.snippets
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading snippets</div>

  return (
    <div className="space-y-4">
      {snippets?.map((snippet) => (
        <div key={snippet.snippet_id} className="border p-4 rounded-md">
          <Link
            href={`/${snippet.full_snippet_name}`}
            className="text-blue-600 hover:underline"
          >
            <h3 className="text-lg font-semibold">{snippet.snippet_name}</h3>
          </Link>
          <p className="text-sm text-gray-600">by {snippet.owner_name}</p>
          <p className="text-sm text-gray-500">
            Created: {new Date(snippet.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}