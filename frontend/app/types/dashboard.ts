export interface DashboardData {
    stats: {
        vendasHoje: { valor: number; quantidade: number };
        faturamentoMes: { valor: number; crescimento: number };
        estoque: number;
        lucro: number;
        ticketMedio: number;
    };
    produtosRecentes: any[];
    vendasRecentes: any[];
}
