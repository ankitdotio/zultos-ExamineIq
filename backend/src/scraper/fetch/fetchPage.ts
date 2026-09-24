export const fetchPage = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "ExamineIQBot/1.0",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.toLowerCase().includes("text/html")) {
    throw new Error(
      `Expected HTML from ${url}, received ${contentType ?? "unknown"}`,
    );
  }

  return response.text();
};
