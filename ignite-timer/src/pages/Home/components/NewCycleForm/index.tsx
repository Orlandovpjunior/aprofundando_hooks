import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { CyclesContext } from "../..";
import { useFormContext } from "react-hook-form";


export function NewCycleForm() {
    const {activeCycle} = useContext(CyclesContext)
    const { register } = useFormContext()    
    return (
        <FormContainer>
            <label htmlFor="">Vou trabalhar em</label>
            <TaskInput
                id="task"
                placeholder="Dê um nome para o seu projeto"
                list="taskSuggestions"
                disabled={!!activeCycle}
                {...register('task')}
            />
            <datalist id="taskSuggestions">
                <option value="Projeto 1" />
                <option value="Projeto 2" />
                <option value="Projeto 3" />

            </datalist>
            <label htmlFor="">durante</label>
            <MinutesAmountInput
                type="number"
                id="minutesAmount"
                placeholder="00"
                step={5}
                min={5}
                max={60}
                disabled={!!activeCycle}
                {...register('minutesAmount', { valueAsNumber: true })}
            />
            <span>minutos.</span>
        </FormContainer>
    )

}