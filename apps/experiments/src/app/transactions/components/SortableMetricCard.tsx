import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import clsx from "clsx"
import { useAtomValue } from "jotai"

import { isEditingAtom } from "../state"
import { MetricCard, type Item } from "./MetricCard"

export interface SortableMetricCardProps {
  item: Item
  editing?: boolean
}

export function SortableMetricCard({ item }: SortableMetricCardProps) {
  const editing = useAtomValue(isEditingAtom)

  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    isOver,
    transition,
  } = useSortable({
    id: item.id,
    disabled: !editing,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <MetricCard
      {...item}
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={style}
      className={clsx("cursor-default", {
        "z-50": isDragging,
        vibrating: editing && !isDragging && !isOver,
        "cursor-grab": editing && !isDragging,
        "cursor-grabbing": editing && isDragging,
      })}
    />
  )
}
