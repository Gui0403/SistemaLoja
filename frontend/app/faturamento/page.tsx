import { PageLayout } from "../components/PageLayout";

export default function FaturamentoPage() {
    return (
        <PageLayout title="Faturamento">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui você verá as todas as faturas e seus respectivos filtros.</p>
            </div>
        </PageLayout>
    );
}