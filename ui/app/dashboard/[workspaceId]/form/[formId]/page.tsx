"use client"

import { FormEdit } from "@/components/form/module/edit"
import { FormGeneral } from "@/components/form/module/general"
import { FormResult } from "@/components/form/module/result"
import { FormShare } from "@/components/form/module/share"
import { FormTabType } from "@/types/form-types"
import { useSearchParams } from "next/navigation"

const FormSection = () => {
  const searchParams = useSearchParams()

  const tab = searchParams.get("tab") as FormTabType

  const sections: Record<FormTabType, React.ComponentType> = {
    general: FormGeneral,
    edit: FormEdit,
    result: FormResult,
    share: FormShare,
  }

  const SelectedComponent = sections[tab] || FormEdit

  return SelectedComponent ? <SelectedComponent /> : <FormEdit />
}

export default FormSection
