import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LedgerComponent } from './ledger/ledger.component';
import { AppComponent } from './app.component';

const routes: Routes = [
	{path: '', component: AppComponent},
	{path: 'ledger/:file', component: LedgerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
