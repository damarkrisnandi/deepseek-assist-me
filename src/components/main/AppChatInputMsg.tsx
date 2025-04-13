

// import useMessageStore from "../../store/useMessageStore"
import { Button, Field, Flex, Kbd, NativeSelect, Stack, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { getTags } from "../../services/index"
interface FormValues {
  message: string
}

const AppChatInputMsg = ({ onChat, onChangeModel }: any) => {
  const {
    register,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<FormValues>()


  const onSubmit = handleSubmit((data: any) => {
    onChat(data);
    resetField('message');
  })

  const keydownHandler = (event: any) => {
    if(event.keyCode===13 && event.ctrlKey) {
      console.log(getValues('message'));
      onChat({message: getValues('message')});
      resetField('message');
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="4" align="flex-start" minW="80vh" maxH="100px">
        <Field.Root invalid={!!errors.message}>
          <Textarea
            placeholder="ask something..."
            {...register("message", { required: "Message is not be empty" })}
            onKeyDown={keydownHandler}
          />
          
          <Field.ErrorText>{errors.message?.message}</Field.ErrorText>
          <Flex gap={"2"} height={"100%"}>
            <Button type="submit">
              Submit <Kbd>ctrl</Kbd>+<Kbd>enter</Kbd>
              </Button>
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
      getTags().then((data: any) => {
        setModels(data.models.map(({model}: { model: string }) => ({ label: model, value: model })))
      } )
    }
  })

  useEffect(() => {
    if (models.length > 0) {
      handleSelect({ target: { value: 'deepseek-r1:1.5b' }})
    }
  }, [models])

  const handleSelect = (event: any) => {
    console.log(event)
    onChangeModel(event.target.value)
  }
  
  return (
    <Stack gap="4" width="300px" fontSize={"0.7em"}>
      <NativeSelect.Root size={"md"} onChange={handleSelect}>
        <NativeSelect.Field placeholder={`Select model (Default: deepseek-r1:1.5b)`}>
          { models && models.map((model: any) => <option value={model.value} key={model.value}>{ model.label }</option>) }
          
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Stack>
  )
}

export default AppChatInputMsg;