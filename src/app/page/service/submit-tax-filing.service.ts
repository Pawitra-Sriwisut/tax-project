import { Injectable } from '@angular/core';
import { SelectModel } from '../model/submit-tax-filing.model';

@Injectable({
    providedIn: 'root'
})
export class SubmitTaxFilingService {

    constructor() {
    }

    public queryFilingType() {
        return [
            {
                value: '0',
                label: 'Ordinary Filing'
            },
            {
                value: '1',
                label: 'Additional Filing'
            },
        ];
    }

    public queryMonth() {
        return [
            {
                value: 1,
                label: 'January'
            },
            {
                value: 2,
                label: 'February'
            },
            {
                value: 3,
                label: 'March'
            },
            {
                value: 4,
                label: 'April'
            },
            {
                value: 5,
                label: 'May'
            },
            {
                value: 6,
                label: 'June'
            },
            {
                value: 7,
                label: 'July'
            },
            {
                value: 8,
                label: 'August'
            },
            {
                value: 9,
                label: 'September'
            },
            {
                value: 10,
                label: 'October'
            },
            {
                value: 11,
                label: 'November'
            },
            {
                value: 12,
                label: 'December'
            },
        ];
    }

    public queryYear() {
        const year2020 = 2020;
        var currentTime = new Date();
        var currentYear = currentTime.getFullYear();
        if (currentYear <= year2020) {
            return [{
                value: 2020,
                label: '2020'
            }];
        }
        else {
            let list: SelectModel[] = [];
            for (let i = year2020; i <= currentYear; i++) {
                list.push({
                    value: i,
                    label: i.toString()
                })
            }
            return list;
        }
    }

}