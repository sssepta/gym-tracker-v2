import Calendar from '../../entities/calendar/ui/Calendar.ui'
import AddWorkoutForm from '../../entities/workout/ui/AddWorkoutForm.ui'
import WorkoutHistory from '../../entities/workout/ui/WorkoutHistory.ui'

export function HomePage() {
  return (
    <div className="flex flex-col p-3 min-w-100">
      <HomePageHeader />
      <Calendar />
      <AddWorkoutForm />
      <WorkoutHistory />
    </div>
  )
}

function HomePageHeader() {
  return (
    <div>
      <h1 className="text-3xl">Дневник тренировок</h1>
      <h2 className="text-lg text-zinc-400">Отслеживайте свой прогресс</h2>
    </div>
  )
}
