export default function VulnerabilityListPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">취약점 리스트 (Task ID: {params.id})</h1>
      {/* TODO: Implement vulnerability card list */}
    </div>
  );
}
