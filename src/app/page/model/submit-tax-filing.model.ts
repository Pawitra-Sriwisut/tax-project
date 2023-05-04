export interface RadioModel {
    value: string;
    label: string;
}

export interface SelectModel {
    value: string;
    label: string;
}

export class TaxModel {
    filingTypeValue: string;
    filingType: string;
    monthValue: string;
    month: string;
    yearValue: string;
    year: string;
    saleAmount: number;
    taxAmount: number;
    surcharge: number;
    penalty: number;
    totalAmount: number;

    constructor() {
        this.filingTypeValue = '';
        this.filingType = '';
        this.monthValue = '';
        this.month = '';
        this.yearValue = '';
        this.year = '';
        this.saleAmount = 0;
        this.taxAmount = 0;
        this.surcharge = 0;
        this.penalty = 0;
        this.totalAmount = 0;
    }
}
