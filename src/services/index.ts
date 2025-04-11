export const getResponse = async (messages: any[], model?: string) => fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/x-ndjson" },
    body: JSON.stringify({
        model: model || "deepseek-r1:1.5b",
        messages,
        stream: true,
    }),
})