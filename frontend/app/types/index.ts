export interface StatCardProps {
  title: string;
  value: string | number;
  sub: string;
  icon: React.ElementType;
  color: string;
}

export interface DashboardStats {
  vendasHoje: { valor: number; quantidade: number };
  faturamentoMes: { valor: number; percentual: number };
  estoqueItens: { total: number };
  lucroMes: { valor: number; percentual: number };
  ticketMedio: { valor: number };
}