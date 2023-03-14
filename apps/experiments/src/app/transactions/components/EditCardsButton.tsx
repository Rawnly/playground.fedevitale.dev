"use client"

import React, { FC, PropsWithChildren } from "react"
import { Button } from "@tremor/react"
import { useAtom } from "jotai"

import { isEditingAtom } from "../state"

interface IEditCardsButtonProps { }

const EditCardsButton: FC<PropsWithChildren<IEditCardsButtonProps>> = (
  props
) => {
  const [isEditing, setEditing] = useAtom(isEditingAtom)

  return (
    <Button onClick={() => setEditing((s) => !s)}>
      {isEditing ? "Done" : "Edit"}
    </Button>
  )
}

EditCardsButton.displayName = "EditCardsButton"

export default EditCardsButton
