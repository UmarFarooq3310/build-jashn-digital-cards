'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="bg-slate-950 text-slate-100 flex min-h-screen items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="text-sm text-slate-400">{error?.message || 'An unexpected error occurred'}</p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-amber-500 text-slate-950 rounded-xl font-bold"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
