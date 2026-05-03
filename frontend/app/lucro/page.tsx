import { PageLayout } from "../components/PageLayout";

export default function LucroPage() {
    return (
        <PageLayout title="Lucro">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-gray-500">Aqui você verá todo o lucro com filtros por dias, meses e anos.</p>
            </div>
        </PageLayout>
    );
}