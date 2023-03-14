"use client"

import { forwardRef } from "react"
import MagicNumber from "@/app/pricing-section/components/MagicNumber"
import { Card, Flex, Metric, ProgressBar, Text } from "@tremor/react"

export interface Item {
  id: string
  label: string
  value: number
  budget: number
}

export interface MetricCardProps extends React.ComponentProps<"div"> {
  label: string
  budget: number
  value: number
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ value, label, budget, ...props }, ref) => {
    return (
      <Card {...props} ref={ref}>
        <Text>{label}</Text>
        <Metric className="flex tabular-nums inline-flex">
          $ <MagicNumber accent="#0080ff" value={value} />
        </Metric>
        <Flex className="mt-2 tabular-nums">
          <Text className="truncate">${value}</Text>
          <Text>${budget}</Text>
        </Flex>
        <ProgressBar
          percentageValue={calcPercentage(value, budget)}
          className="mt-2"
          color={getColor(value, budget)}
        />
      </Card>
    )
  }
)

function calcPercentage(value: number, budget: number) {
  return (value / budget) * 100
}

const getColor = (value: number, budget: number): any => {
  if (value > budget) {
    return "red"
  } else if (value < budget / 2) {
    return "green"
  } else {
    return "blue"
  }
}
