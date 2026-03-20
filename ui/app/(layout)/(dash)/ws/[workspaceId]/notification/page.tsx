export default async function WorkspaceNotification({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = await params;

  return workspaceId;
}
