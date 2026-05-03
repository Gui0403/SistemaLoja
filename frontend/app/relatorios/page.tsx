import { PageLayout } from "../components/PageLayout";

export default function RelatoriosPage() {
    return (
        <PageLayout title="Relatórios">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui tem todos os relatórios de vendas.</p>
            </div>
        </PageLayout>
    );
}