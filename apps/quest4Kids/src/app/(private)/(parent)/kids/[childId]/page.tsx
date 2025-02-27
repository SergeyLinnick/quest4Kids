interface ChildPageProps {
  params: Promise<{ childId: string }>;
}

export default async function ChildPage({ params }: ChildPageProps) {
  const childId = (await params).childId;
  console.log("childId", childId);

  return <div>Anna</div>;
}
