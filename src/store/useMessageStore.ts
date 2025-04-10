import { create } from 'zustand'

const getResponse = async (messages: any[]) => await fetch("http://127.0.0.1:11434/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        model: "deepseek-r1:1.5b",
        messages: [...messages],
        stream: true,
    }),
});

const useMessageStore = create((set) => ({
  messages: [],

  addMessages: (message: string) => set(
    async (state: any) => 
        ({ 
            messages: [
                ...state.messages,
                    await getResponse([...state.messages, { role: 'user', content: message }])
                .then((data: any) => data._ok ? data.json() as any[] : null)
            ]
        })
    ),  
}))

export default useMessageStore;