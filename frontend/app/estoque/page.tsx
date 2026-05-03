import { PageLayout } from "../components/PageLayout";

export default function EstoquePage() {
    return (
        <PageLayout title="Estoque">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui você verá a lista de produtos do seu estoque.</p>
            </div>
        </PageLayout>
    );
}