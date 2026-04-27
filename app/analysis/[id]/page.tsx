export default function DashboardPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">대시보드 (Task ID: {params.id})</h1>
      {/* TODO: Implement Status indicators */}
    </div>
  );
}
