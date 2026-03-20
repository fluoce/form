export default async function WorkspaceBilling({
  params,
}: {
  params: { workspaceId: string };
}) {
  const { workspaceId } = await params;

  return workspaceId;
}
