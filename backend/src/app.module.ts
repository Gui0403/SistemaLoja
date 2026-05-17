import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { AppController } from '@/app.controller';
import { PrismaModule } from '@/prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { SalesModule } from './modules/vendas/vendas.module';
import { InvoicesModule } from './modules/faturas/faturas.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/clientes/clientes.module';
import { CategoriesModule } from './modules/categorias/categorias.module';





@Module({
  imports: [PrismaModule, AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CategoriesModule,
    SalesModule,
    UsersModule,
    CustomersModule,
    InvoicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
