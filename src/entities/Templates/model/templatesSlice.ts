import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { WorkoutTemplate } from './types'

const STORAGE_KEY = 'workout_diary_templates'
const stored = localStorage.getItem(STORAGE_KEY)

const initialState: WorkoutTemplate[] = stored ? JSON.parse(stored) : []

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    addTemplate(state, actions: PayloadAction<WorkoutTemplate>) {
      state.push(actions.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    },
    updateTemplate(state, actions: PayloadAction<WorkoutTemplate>) {
      const newState = state.map((template) =>
        template.id === actions.payload.id ? { ...actions.payload } : template
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      return newState
    },
    deleteTemplate(state, actions: PayloadAction<string>) {
      const newState = state.filter((template) => template.id !== actions.payload)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState))
      return newState
    },
  },
})

export const { addTemplate, updateTemplate, deleteTemplate } = templateSlice.actions

export const templateReducer = templateSlice.reducer
