

// import useMessageStore from "../../store/useMessageStore"
import { Button, Field, Flex, Kbd, NativeSelect, Stack, Textarea } from "@chakra-ui/react"
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
      fetch('http://127.0.0.1:11434/api/tags')
      .then((resp: any) => resp.ok ? resp.json() : [])
      .then((data: any) => {
        setModels(data.models.map(({model}: { model: string }) => ({ label: model, value: model })))
      } )
    }
  })

  useEffect(() => {
    if (models.length > 0) {
      handleSelect({ target: { value: models[0]?.value }})
    }
  }, [models])

  const handleSelect = (event: any) => {
    console.log(event)
    onChangeModel(event.target.value)
  }
  
  return (
    <Stack gap="4" width="300px" fontSize={"0.7em"}>
      <NativeSelect.Root size={"md"} onChange={handleSelect}>
        <NativeSelect.Field placeholder={`Select model (Default: ${models[0]?.value})`}>
          { models && models.map((model: any) => <option value={model.value} key={model.value}>{ model.label }</option>) }
          
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Stack>
  )
}

export default AppChatInputMsg;