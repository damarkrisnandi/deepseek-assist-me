export const chatAssistant = async (messages: any[], model?: string) => fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/x-ndjson" },
    body: JSON.stringify({
        model: model || "deepseek-r1:1.5b",
        messages,
        stream: true,
    }),
})

export const getTags = async () => fetch('http://127.0.0.1:11434/api/tags')
.then((resp: any) => resp.ok ? resp.json() : [])