import { useEffect, useState } from 'react'
import Input from '../../../shared/ui/input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addTemplate, updateTemplate } from '../model/templatesSlice'
import type { Exercise } from '../../exercise/model/types'
import Button from '../../../shared/ui/button/Button'
import CloseIcon from '../../../shared/ui/icons/close'
import LowTabModal from '../../../shared/ui/lowTabModal/LowTabModal'
import AddExerciseToTemplateForm from './AddExerciseToTemplateForm.ui'
import { useLocation } from 'react-router'
import { selectTemplates } from '../model/selector'

export default function AddTemplateForm() {
  const { state } = useLocation()
  const isEdit = !!state?.templateId
  const templates = useSelector(selectTemplates)

  const templateForEdit = isEdit ? templates.find((t) => t.id === state.templateId) : null

  const [nameTemplate, setNameTemplate] = useState(templateForEdit?.name ?? '')
  const [AddExerciseFormIsVisible, setAddExerciseFormIsVisible] = useState(false)
  const [exercises, setExercises] = useState<Exercise[]>(templateForEdit?.exercises ?? [])

  const dispatch = useDispatch()

  function handleAddExercises(exercise: Exercise) {
    if (exercises.some((e) => e.id === exercise.id)) {
      return
    }

    setExercises((prev) => [exercise, ...prev])
    setAddExerciseFormIsVisible(false)
  }

  return (
    <div>
      <form className="flex flex-col w-full mb-3 p-3 rounded-xl bg-zinc-800">
        <Input
          value={nameTemplate}
          onChange={setNameTemplate}
          classes={'mt-3'}
          placeholder={'Название шаблона'}
        />
      </form>
      <Button color="orange" onClick={() => setAddExerciseFormIsVisible(true)}>
        Добавить упражнение
      </Button>
      {AddExerciseFormIsVisible && (
        <LowTabModal>
          <AddExerciseToTemplateForm
            handleAddExercises={handleAddExercises}
            setAddExerciseFormIsVisible={setAddExerciseFormIsVisible}
          />
        </LowTabModal>
      )}
      {exercises.length == 0 ? (
        <div className="flex flex-col justify-center items-center w-full min-h-30 mt-3 rounded-xl bg-zinc-800 text-zinc-400">
          <span>Добавьте упражнение</span>
          <span className="text-xs">Подходы и вес вы добавите во время тренировки</span>
        </div>
      ) : (
        exercises.map((exercise) => {
          return (
            <div
              key={exercise.id}
              className="flex justify-between items-center w-full h-15 p-3 my-2 rounded-xl bg-zinc-800"
            >
              <span>{exercise.name}</span>
              <button
                className="w-7 h-7 p-0.5 rounded-lg cursor-pointer hover:bg-zinc-500"
                onClick={() => setExercises(exercises.filter((ex) => ex.id !== exercise.id))}
              >
                <CloseIcon />
              </button>
            </div>
          )
        })
      )}
      {exercises.length > 0 && (
        <Button
          color="orange"
          onClick={() => {
            if (!isEdit) {
              dispatch(
                addTemplate({ id: new Date().toString(), name: nameTemplate, exercises: exercises })
              )
            } else {
              dispatch(
                updateTemplate({
                  id: state.templateId,
                  name: nameTemplate,
                  exercises: exercises,
                })
              )
            }
            setNameTemplate('')
            setExercises([])
          }}
        >
          Сохранить шаблон
        </Button>
      )}
    </div>
  )
}
