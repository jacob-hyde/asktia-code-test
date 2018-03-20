import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, retry } from 'rxjs/operators';
import { Ledger } from './Ledger';
@Injectable()
export class LedgerService
{

	public ledgerItems = new BehaviorSubject<Ledger>(null);


	constructor(private http: HttpClient){}

	public getLedgerItems(ledgerFile: string)
	{
		this.http.get<any>(`http://localhost:3000/ledger/${ledgerFile}`)
			.subscribe(
				data => {
					data.forEach(ledgerItem => {
						let item: Ledger = {id: ledgerItem.activity_id, date: new Date(ledgerItem.date), type: ledgerItem.type, amount: ledgerItem.amount, balance: ledgerItem.balance, description: 'From '};
						// if('requester' in ledgerItem) item.description = `From ${ledgerItem.requester.type.toLowerCase()}`;
						if('source' in ledgerItem && 'description' in ledgerItem.source) item.description += `${ledgerItem.source.description} `;
						else item.description += `${ledgerItem.destination.description} `;
						if(ledgerItem.source.type === "INVESTOR" || ledgerItem.source.type === "ISSUER") item.description += `to ${ledgerItem.destination.description}`;
						if('method' in ledgerItem) item.description += ` via ${ledgerItem.method === "WIRE" ? "wire transfer" : ledgerItem.method}`
						this.ledgerItems.next(item);
					});
				},
				error => this.errorHandler(error)
			);

	}

	private errorHandler(error: HttpErrorResponse)
	{
		if(error.error instanceof ErrorEvent) console.error(`An error occurred: ${error.error.message}`);
		else
		{
			console.error(`Server error code: ${error.status}`);
			console.error(error.message);
		}
		this.ledgerItems.error(error);
		this.ledgerItems.hasError = false;
		this.ledgerItems.isStopped = false;
		this.ledgerItems.thrownError = null;
	}

}
