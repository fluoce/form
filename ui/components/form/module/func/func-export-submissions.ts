import * as XLSX from "xlsx"
import jsPDF from "jspdf"

export function funcExportToExcel(submissions: any[]) {
  const normalized = submissions.map((submission) => {
    const row: Record<string, any> = {
      ID: submission?.id || "-",
      Status: submission?.status || "-",
      Device: submission?.device || "-",
      CreatedAt: submission?.createdAt || "-",
      CompletedAt: submission?.completedAt || "-",
      AnsweredCount: submission?.answeredCount || "-",
    }
    submission.questions.forEach((q: any) => {
      row[q?.question] = q?.answer
    })
    return row
  })

  const worksheet = XLSX.utils.json_to_sheet(normalized)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")
  XLSX.writeFile(workbook, "submissions.xlsx")
}

export function funcExportToCsv(submissions: any[]) {
  const normalized = submissions.map((submission) => {
    const row: Record<string, any> = {
      ID: submission?.id || "-",
      Status: submission?.status || "-",
      Device: submission?.device || "-",
      CreatedAt: submission?.createdAt || "-",
      CompletedAt: submission?.completedAt || "-",
      AnsweredCount: submission?.answeredCount || "-",
    }
    submission.questions.forEach((q: any) => {
      row[q?.question] = q?.answer
    })
    return row
  })

  const worksheet = XLSX.utils.json_to_sheet(normalized)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions")
  XLSX.writeFile(workbook, "submissions.csv")
}

export function funcExportToPdf(submissions: any[]) {
  const doc = new jsPDF()
  submissions.forEach((submission, submissionIndex) => {
    if (submissionIndex !== 0) {
      doc.addPage()
    }
    let y = 20
    doc.setFontSize(18)
    doc.text(`Form Response ${submissionIndex + 1}`, 14, y)
    y += 15
    doc.setFontSize(11)
    doc.text(`Submission ID: ${submission?.id || "-"}`, 14, y)
    y += 8
    doc.text(`Status: ${submission?.status || "-"}`, 14, y)
    y += 8
    doc.text(`Device: ${submission?.device || "-"}`, 14, y)
    y += 8
    doc.text(`Created At: ${submission?.createdAt || "-"}`, 14, y)
    y += 8
    doc.text(`Completed At: ${submission?.completedAt || "-"}`, 14, y)
    y += 15
    submission?.questions?.forEach((q: any, index: number) => {
      if (y > 260) {
        doc.addPage()
        y = 20
      }
      doc.setFontSize(13)
      const splitQuestion = doc.splitTextToSize(
        `Q${index + 1}. ${q?.question}`,
        180
      )
      doc.text(splitQuestion, 14, y)
      y += splitQuestion?.length * 7
      y += 5
      doc.setFontSize(11)
      doc.text("Answer:", 18, y)
      y += 8
      const answer = q?.answer?.toString() || "-"
      const splitAnswer = doc.splitTextToSize(answer, 170)
      doc.text(splitAnswer, 22, y)
      y += splitAnswer?.length * 7
      y += 12
    })
  })

  doc.save("submissions.pdf")
}
