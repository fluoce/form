export default async function WorkspaceDomain({ params }: { params: { workspaceId: string } }) {

    const { workspaceId } = await params

    return workspaceId
}