export default async function WorkspaceMember({ params }: { params: { workspaceId: string } }) {

    const { workspaceId } = await params

    return workspaceId
}