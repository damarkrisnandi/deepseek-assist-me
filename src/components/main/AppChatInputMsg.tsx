

// import useMessageStore from "../../store/useMessageStore"
import { Button, Field, Flex, NativeSelect, Portal, Select, Stack, Textarea, createListCollection } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface FormValues {
  message: string
}

const AppChatInputMsg = ({ onChat, onChangeModel }: any) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>()


  // const addDefaultMessages = useMessageStore((state: any) => state.addDefaultMessages)
  // const addMessages = useMessageStore((state: any) => state.addMessages)
  // const messages = useMessageStore((state: any) => state.messages)
  const onSubmit = handleSubmit((data: any) => {
    onChat(data);
    resetField('message');
  })

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" minW="80vh" maxH="100px">
        <Field.Root invalid={!!errors.message}>
          <Textarea
            placeholder="ask something..."
            {...register("message", { required: "Message is not be empty" })}
          />
          
          <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
          <Flex gap={"2"} height={"100%"}>
            <Button type="submit">Submit</Button>
            <SelectModel onChangeModel={onChangeModel} />
          </Flex>
          
        </Field.Root>
        
      </Stack>
    </form>
  )
}

const SelectModel = ({ onChangeModel }: any) => {
  const [models, setModels] = useState<any[]>([])
  useEffect(() => {
    if (models.length === 0) {
      fetch('http://127.0.0.1:11434/api/tags')
      .then((resp: any) => resp.ok ? resp.json() : [])
      .then((data: any) => {
        setModels(data.models.map(({model}: { model: string }) => ({ label: model, value: model })))
      } )
    }
  })

  useEffect(() => {
    if (models.length > 0) {
      handleSelect({ target: { value: models[0].value }})
    }
  }, [models])

  const handleSelect = (event: any) => {
    console.log(event)
    onChangeModel(event.target.value)
  }
  
  return (
    <Stack gap="4" width="240px">
      <NativeSelect.Root size={"md"} onChange={handleSelect}>
        <NativeSelect.Field placeholder="Select model">
          { models && models.map((model: any) => <option value={model.value} key={model.value}>{ model.label }</option>) }
          
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Stack>
  )
}


const frameworks = createListCollection({
  items: [
    { label: "React.js", value: "react" },
    { label: "Vue.js", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Svelte", value: "svelte" },
  ],
})

export default AppChatInputMsg;