

import useMessageStore from "../../store/useMessageStore"
import { Button, Field, Stack, Textarea } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface FormValues {
  message: string
}

const AppChatInputMsg = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()


  const addMessages = useMessageStore((state: any) => state.addMessages)
  const onSubmit = handleSubmit((data: any) => {
    addMessages(data.message)
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start"  width="lg" minWidth="90vw" maxH="100px">
        <Field.Root invalid={!!errors.message}>
          <Textarea
            placeholder="ask something..."
            {...register("message", { required: "Message is not be empty" })}
          />
          
          <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
          <Button type="submit">Submit</Button>
        </Field.Root>
        
      </Stack>
    </form>
  )
}

export default AppChatInputMsg;