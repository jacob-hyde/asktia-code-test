import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Ledger } from '../ledger';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

	private ledgerFile: string;

	public ledgerItems: Ledger[] = [];
	public isError: boolean = false;

	constructor(private route: ActivatedRoute, private router: Router, private _ledger: LedgerService)
	{
		this.route.params.subscribe(res => this.ledgerFile = res.file);
	}

	ngOnInit()
	{	
		this._subscribeToLedgerService();
		this._ledger.getLedgerItems(this.ledgerFile);
		this.router.events.subscribe((event) => {
			if(event instanceof NavigationEnd)
			{
				if(this.isError){
					this.isError = false;
					this._subscribeToLedgerService();
				}
				this.ledgerItems = [];
				this._ledger.getLedgerItems(this.ledgerFile);
			}
		});
	}

	private _subscribeToLedgerService(): void
	{
		this._ledger.ledgerItems.subscribe(res => {
			if(res !== null) this.ledgerItems.push(res)
		}, err => {
			this.isError = true;
		});
	}


}
