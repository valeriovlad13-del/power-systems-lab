import CalculatorTool from "@/components/calculators/calculator-tool";

export default async function CalculatorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CalculatorTool slug={slug} />;
}
