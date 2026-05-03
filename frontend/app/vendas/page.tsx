import { PageLayout } from "../components/PageLayout";

export default function VendasPage() {
    return (
        <PageLayout title="Gestão de Vendas">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui você listará todas as vendas do banco de dados.</p>
            </div>
        </PageLayout>
    );
}