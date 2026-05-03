import { PageLayout } from "../components/PageLayout";

export default function ConfiguracoesPage() {
    return (
        <PageLayout title="Configurações">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui você verá as configurações do sistema.</p>
            </div>
        </PageLayout>
    );
}