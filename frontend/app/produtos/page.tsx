import { PageLayout } from "../components/PageLayout";

export default function ProdutosPage() {
    return (
        <PageLayout title="Produtos">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui tem a lista de todos os produtos do seu estoque.</p>
            </div>
        </PageLayout>
    );
}