-- CreateEnum
CREATE TYPE "StatusVendaEnum" AS ENUM ('PENDENTE', 'PROCESSANDO', 'ENVIADA', 'ENTREGUE', 'CANCELADA');

-- CreateEnum
CREATE TYPE "FormaPagamentoEnum" AS ENUM ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'BOLETO', 'TRANSFERENCIA');

-- CreateEnum
CREATE TYPE "StatusFaturaEnum" AS ENUM ('EMITIDA', 'PAGA', 'CANCELADA', 'DEVOLVIDA');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "skuCode" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "precoCusto" DECIMAL(10,2) NOT NULL,
    "precoVenda" DECIMAL(10,2) NOT NULL,
    "estoqueAtual" INTEGER NOT NULL DEFAULT 0,
    "estoqueMínimo" INTEGER NOT NULL DEFAULT 10,
    "itensVendidos" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "telefone" TEXT,
    "cpfCnpj" TEXT,
    "endereco" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendas" (
    "id" TEXT NOT NULL,
    "numeroVenda" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "usuarioId" TEXT,
    "subtotal" DECIMAL(10,2) NOT NULL,
    "desconto" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "status" "StatusVendaEnum" NOT NULL DEFAULT 'PENDENTE',
    "formaPagamento" "FormaPagamentoEnum",
    "dataVenda" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataEntrega" TIMESTAMP(3),
    "observacoes" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens_venda" (
    "id" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnitario" DECIMAL(10,2) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itens_venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faturas" (
    "id" TEXT NOT NULL,
    "numeroFatura" TEXT NOT NULL,
    "vendaId" TEXT NOT NULL,
    "statusFatura" "StatusFaturaEnum" NOT NULL DEFAULT 'EMITIDA',
    "dataEmissao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataPagamento" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- CreateIndex
CREATE INDEX "categorias_nome_idx" ON "categorias"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "produtos_skuCode_key" ON "produtos"("skuCode");

-- CreateIndex
CREATE INDEX "produtos_skuCode_idx" ON "produtos"("skuCode");

-- CreateIndex
CREATE INDEX "produtos_categoriaId_idx" ON "produtos"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cpfCnpj_key" ON "clientes"("cpfCnpj");

-- CreateIndex
CREATE INDEX "clientes_cpfCnpj_idx" ON "clientes"("cpfCnpj");

-- CreateIndex
CREATE INDEX "clientes_email_idx" ON "clientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "vendas_numeroVenda_key" ON "vendas"("numeroVenda");

-- CreateIndex
CREATE INDEX "vendas_clienteId_idx" ON "vendas"("clienteId");

-- CreateIndex
CREATE INDEX "vendas_usuarioId_idx" ON "vendas"("usuarioId");

-- CreateIndex
CREATE INDEX "vendas_numeroVenda_idx" ON "vendas"("numeroVenda");

-- CreateIndex
CREATE INDEX "vendas_status_idx" ON "vendas"("status");

-- CreateIndex
CREATE INDEX "itens_venda_vendaId_idx" ON "itens_venda"("vendaId");

-- CreateIndex
CREATE INDEX "itens_venda_produtoId_idx" ON "itens_venda"("produtoId");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_numeroFatura_key" ON "faturas"("numeroFatura");

-- CreateIndex
CREATE UNIQUE INDEX "faturas_vendaId_key" ON "faturas"("vendaId");

-- CreateIndex
CREATE INDEX "faturas_vendaId_idx" ON "faturas"("vendaId");

-- CreateIndex
CREATE INDEX "faturas_numeroFatura_idx" ON "faturas"("numeroFatura");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_venda" ADD CONSTRAINT "itens_venda_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_venda" ADD CONSTRAINT "itens_venda_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faturas" ADD CONSTRAINT "faturas_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "vendas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
