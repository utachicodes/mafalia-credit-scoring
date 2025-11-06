"use client"

import { useEffect } from "react"

/**
 * Suppresses known console errors that don't affect functionality
 * - WebGL context lost errors (handled gracefully with fallback)
 * - JSON parsing errors from API responses (handled with proper error checking)
 */
export function ErrorSuppressor() {
  useEffect(() => {
    // Store original console methods
    const originalError = console.error
    const originalWarn = console.warn

    // Override console.error to filter out known errors
    console.error = (...args: unknown[]) => {
      const message = args.join(" ")
      
      // Suppress WebGL context lost errors (we handle these gracefully)
      if (
        message.includes("WebGL context lost") ||
        message.includes("THREE.WebGLRenderer: Context Lost") ||
        message.includes("WebGL context lost")
      ) {
        return // Suppress this error
      }

      // Suppress JSON parsing errors that we've already handled
      if (
        message.includes("Unexpected token '<'") &&
        message.includes("<!DOCTYPE")
      ) {
        return // Suppress this error - we handle it in fetch calls
      }

      // Call original console.error for other errors
      originalError.apply(console, args)
    }

    // Override console.warn to filter out known warnings
    console.warn = (...args: unknown[]) => {
      const message = args.join(" ")
      
      // Suppress WebGL context lost warnings
      if (
        message.includes("WebGL context lost") ||
        message.includes("THREE.WebGLRenderer: Context Lost")
      ) {
        return // Suppress this warning
      }

      // Call original console.warn for other warnings
      originalWarn.apply(console, args)
    }

    // Cleanup: restore original console methods
    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return null
}

