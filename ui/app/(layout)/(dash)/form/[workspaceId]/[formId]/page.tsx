
export default async function Form({
    params
}: {
    params: {
        formId: string
    }
}) {

    const { formId } = await params

    return (
        <div>
            form-id = {formId}
        </div>
    )
}
