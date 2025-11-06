/**
 * Safely fetch and parse JSON responses
 * Handles cases where the API might return HTML error pages instead of JSON
 */
export async function safeFetchJson<T = unknown>(
  url: string,
  options?: RequestInit
): Promise<{ data: T | null; error: string | null }> {
  try {
    const res = await fetch(url, options)
    
    // Check if response is ok
    if (!res.ok) {
      const text = await res.text()
      // If it's HTML, return a generic error
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        return {
          data: null,
          error: `API returned HTML instead of JSON (${res.status} ${res.statusText})`
        }
      }
      // Try to parse as JSON for error messages
      try {
        const json = JSON.parse(text)
        return {
          data: null,
          error: json.error || `API error: ${res.status} ${res.statusText}`
        }
      } catch {
        return {
          data: null,
          error: `API error: ${res.status} ${res.statusText}`
        }
      }
    }

    // Check content type
    const contentType = res.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text()
      // If it's HTML, return error
      if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        return {
          data: null,
          error: "API returned HTML instead of JSON"
        }
      }
      return {
        data: null,
        error: `Expected JSON but got ${contentType}`
      }
    }

    // Parse JSON
    const data = await res.json()
    return { data, error: null }
  } catch (error) {
    console.error("Fetch error:", error)
    return {
      data: null,
      error: error instanceof Error ? error.message : "Unknown fetch error"
    }
  }
}

