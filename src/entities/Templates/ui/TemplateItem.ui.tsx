import EditIcon from '../../../shared/ui/icons/edit'
import TrashIcon from '../../../shared/ui/icons/trash'
import { useDispatch } from 'react-redux'
import { deleteTemplate } from '../model/templatesSlice'
import type { Exercise } from '../../exercise/model/types'
import type { WorkoutTemplate } from '../model/types'
import { useNavigate } from 'react-router'

export default function TemplateItem({ template }: { template: WorkoutTemplate }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col w-full h-fit rounded-xl p-3 mb-2 bg-zinc-800">
      <div className="flex justify-between items-center h-8">
        <h1 className="text-xl">{template.name}</h1>
        <div>
          <button
            className="cursor-pointer"
            onClick={() =>
              navigate('/lib/create-templates', { state: { templateId: template.id } })
            }
          >
            <EditIcon />
          </button>
          <button className="cursor-pointer" onClick={() => dispatch(deleteTemplate(template.id))}>
            <TrashIcon />
          </button>
        </div>
      </div>
      <span className="mb-3 text-sm text-zinc-400">{template.exercises?.length} упражнений</span>
      <div className="flex flex-col">
        {template.exercises.map((exercise: Exercise) => {
          return (
            <div
              key={exercise.id}
              className="flex items-center h-12 mb-2 p-3 rounded-xl bg-zinc-900"
            >
              {exercise.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}
