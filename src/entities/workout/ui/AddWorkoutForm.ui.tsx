import Button from '../../../shared/ui/button/Button'

export default function AddWorkoutForm() {
  return (
    <>
      <h2 className="text-xl mt-2 mb-3">Сегодняшняя тренировка</h2>
      <div>
        <Button color="orange">Добавить упражнение</Button>
        <div className="mb-2" />
        <Button color="zinc">Из шаблона</Button>
      </div>
    </>
  )
}
