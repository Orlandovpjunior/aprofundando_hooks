import { HandPalm, Play } from "phosphor-react";
import {
    HomeContainer,
    StartCountdownButton,
    StopCountdownButton,
} from "./styles";
import { useContext } from "react";
import { Countdown } from "./components/Countdown";
import zod from 'zod'
import { NewCycleForm } from "./components/NewCycleForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CyclesContext } from "../../context/CyclesContext";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe o nome do projeto'),
    minutesAmount: zod.number()
        .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
        .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {

    const {createNewCycle, interruptCurrentCycle, activeCycle} = useContext(CyclesContext)
    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })
    const { handleSubmit, watch, reset} = newCycleForm

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data)
        reset()
    }
    const task = watch('task')
    const isSubmitDisabled = !task

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>

                <Countdown />

                {activeCycle ? (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ) : (
                    <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}