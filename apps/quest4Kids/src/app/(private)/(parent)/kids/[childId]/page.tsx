interface ChildPageProps {
  params: { childId: string };
}

export default async function ChildPage({ params }: ChildPageProps) {
  const { childId } = await params;
  console.log("childId", childId);

  return <div>Anna</div>;
}
