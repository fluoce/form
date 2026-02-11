export default async function WorkspaceIntegration({ params }: { params: { workspaceId: string } }) {

    const { workspaceId } = await params

    return workspaceId
}