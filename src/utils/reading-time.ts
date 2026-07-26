/**
 * Estimate reading time in minutes from raw markdown/text content.
 */
export function readingTime(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, " ") // drop code blocks
    .replace(/[#>*_`~\-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
