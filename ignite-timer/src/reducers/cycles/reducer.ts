import { ActionTypes } from "./actions"
import { produce } from 'immer'

interface cyclesState {
    cycles: Cycle[]
    activeCycleId: string | null
}

export interface Cycle {
    id: string,
    task: string,
    minutesAmount: number,
    startDate: Date,
    interruptedDate?: Date,
    finishedDate?: Date,
}

export function cyclesReducer(state: cyclesState, action: any) {

    if (action.type == ActionTypes.ADD_NEW_CYCLE) {
        return produce(state, (draft) => {
            draft.cycles.push(action.payload.newCycle)
            draft.activeCycleId = action.payload.newCycle.id
        })
    }
    if (action.type == ActionTypes.INTERRUPT_CURRENT_CYCLE) {

        const currentCycleIndex = state.cycles.findIndex(cycle => {
            return cycle.id == state.activeCycleId
        })

        if (currentCycleIndex < 0) {
            return state
        }
        return produce(state, (draft) => {
            draft.activeCycleId = null
            draft.cycles[currentCycleIndex].interruptedDate = new Date()
        })
    }
    if (action.type == ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED) {
        const currentCycleIndex = state.cycles.findIndex(cycle => {
            return cycle.id == state.activeCycleId
        })

        if (currentCycleIndex < 0) {
            return state
        }
        return produce(state, (draft) => {
            draft.activeCycleId = null
            draft.cycles[currentCycleIndex].finishedDate = new Date()
        })
    }
    return state
}