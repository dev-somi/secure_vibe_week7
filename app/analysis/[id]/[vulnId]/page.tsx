export default function VulnerabilityDetailPage({ params }: { params: { id: string; vulnId: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">취약점 상세 (ID: {params.vulnId})</h1>
      {/* TODO: Implement Scenario, Fix direction, Diff view */}
    </div>
  );
}
