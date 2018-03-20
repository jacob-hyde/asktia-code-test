import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit 
{

	public balance: number;
	public isError: boolean = false;

	constructor(private router: Router, private _ledger: LedgerService){}

	ngOnInit() {
		this._subscribeToLedgerService();
		this.router.events.subscribe((event) => {
			if(event instanceof NavigationStart)
			{
				if(this.isError){
					this.isError = false;
					this._subscribeToLedgerService();
				}
				this.balance = null;
			}
		});
	}

	private _subscribeToLedgerService(): void
	{
		this._ledger.ledgerItems.subscribe(res => {
			if(res === null || this.balance) return;
			this.balance = res.balance;
		}, err => {
			this.isError = true;
		});
	}

}
