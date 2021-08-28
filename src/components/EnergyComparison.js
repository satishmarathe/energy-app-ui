import React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import EnergyComparisonResult from "./EnergyComparisonResult.js";

// Initialize the sheet - doc ID is the long id in the sheets URL



class EnergyComparison extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            myName: '',
            vendorRatesArray: [],
            yearlyConsumptionArray: [],
            displayArray: [],
            annualCostsPerVendorArray: []           
        }  
    }

    isWinter(billingStartDate,billingEndDate,winterStartDate,winterEndDate){
        if(billingStartDate.getMonth() >= winterStartDate.getMonth() && billingStartDate.getMonth() <= winterEndDate.getMonth()
        && billingEndDate.getMonth() <= winterEndDate.getMonth()){
            /** winter */
            console.log("Kobe its winter");
            return true;
        }
        return false;
    }

    isWinterIntoSummer(billingStartDate,billingEndDate,winterStartDate,winterEndDate){
        if(billingStartDate.getMonth() >= winterStartDate.getMonth() && billingStartDate.getMonth() <= winterEndDate.getMonth()
        && billingEndDate.getMonth() > winterEndDate.getMonth()){
            /** winter into summer */
            console.log("Kobe its winter into summer");
            return true;
        }
        return false;
    }

    isSummerIntoWinter(billingStartDate,billingEndDate,winterStartDate,winterEndDate){
        if(billingEndDate.getMonth() >= winterStartDate.getMonth() && billingEndDate.getMonth() <= winterEndDate.getMonth()
        && billingStartDate.getMonth() < winterStartDate.getMonth()){
            /** summer into winter */
            console.log("Kobe its summer into winter");
            return true;
        }
        return false;
    }


    componentDidMount(){
        console.log('step 1');
        const doc = new GoogleSpreadsheet('1_AqGWXit2jDNCoKRRwmXvUf4_JcU29wDgQzc_J8r8RQ');

        /**
        doc.useServiceAccountAuth({
            client_email: 'energyappuser@energyapp-315301.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjhKAOshsDsZz6\nsuGwXRJLqshOb1zxyPUVf7uBCu/0zzl/COuzNHeN/NW+8rg+qztU7oMjWJO4rzyC\ncslkdQAS58Zx9E8yTS6LJU7ALgy1y0Dns4Xhc55b2q2vIuQ1MWqWCnylKb8m340t\nILLo/JOd7J9zo3f08RePcq/kAhmaECXSidld2Zb73GcC8iVh1yTNCMs4uJ5LMso+\ngK7hxiLhR+MpVqldmdFeNWHXsBuY2MavVzu+HRDMVK/ArQ822OHytA7nuYIst6Pf\nFv6p17oeqe/KHq3qtU9DGU8fQRTx/IQcJE1KeSOwkbfInfqLYgl13bHyeGOKu7ZE\nKUstEZndAgMBAAECggEAJNzL8Wws42EJxMmJT+c3bef3Bpmb4CT/vURBqrZiwHNr\n4IvMCOb50cBPFmAk8XnMIxou5Yu9J4wXrce/R36J0Pk/tyZOqUYViUhUj8YB1wTW\nYbWKp7fXGhl7AKmyvRwiDWeZUGmQHm0UqDkAJD52b8ptatYN/6HPQCcoaFQh3eVM\nP7NfQiZqaGfnhI8sdAoic68iPQxJQWU4uNJ4CTVbU7qdHyzg+EcbEoepXqkbt/OF\nDWN4dsx+XpDZXiG/lJQD0NIbzgNCb/AqleaK4xDfTtQieSySVgmQF9Msnvy21iYs\n22HuDS7aX01z1qXi2Cdf0hYKPXRD30TSiwdZV7HT6QKBgQDRW1yssGfg7aOVuilU\nuY54+RL3kLBqyiA8eKt2kyC0DFBHRbMS3wWTvtyppLLGWIWhw8io903FTslsDhhT\nyIfavK7T0gTF+ENMSCCBL6zEaO0EdV5Rq9+Dzyydj4PH6sWDIjmiUp72qXNlSoTe\nGmpbopqh/CxL4F8jtJWmiH5t9QKBgQDH8tp0OfrQRU8kE1JViJPUQqe4Z+PGDV+J\noF4eLb5Gii7Y2utBiQfRPt84oh6ZdsxS2jqlZiCu7WA5Zq0VCvWUgHkzgrY7BEct\ngSdvaOe6KAWpzmpP45uesq8tgrQSn8Laf+i+4lVNws/3EARsGWQLl+jCUWM0t/tg\noUvA+PTjSQKBgHhjJxmOn01ymZzh3h6ATXM3FzcRFsFx1bOwWDjpRecDJa62X9E8\nOgLJwC41LTBtevqYkOzIuQn60ky2ljqnl6eq1IWtwVzt9BULbNWcyqZvB8yGiWRB\nh1hObAN2oXr2f/l2VtoG1K5WpqrafSkS25IyIOWBEx/WuB7aGywWVU15AoGBALpu\nE4XfMZ7ToPDwGwqpZ7y30Y49P8FAYt396wOUfx9iZD/KDyRx0hol1xgFASbx/50Y\n4SmqybqQlfGvbJ58M3KdP2Tp8WOhn4QsMkrMs5N9EZq8XZ/Thxw3WuLCRYg/8fys\n2qRwgD0a8bFY++aW3hN5NotIO4nCKd51Rh7NgfgRAoGARBdtapixdU0vXfzwzcxZ\ngHQGeXFpa/QfdwCxoO8qhAj6EBmXt0DoE70L97g6PUdCwrhraxuFr6ekpsd3rjJV\nxWx9KohL87DUgSyVUrP03sVUVzMgmyjm4kDThpNNSq2ZejxN//pny7Q26mtG7UWF\nVdf4ODExT7z3YXnEDmaUkA4=\n-----END PRIVATE KEY-----\n',
          }, function (err) {
                    console.log(err);
                    // Get all of the rows from the spreadsheet.
                    doc.getRows(1, function (err, rows) {
                        this.setState(
                            { myName: 'abc'}
                        );
                        console.log(rows);
                        console.log("did we come here");
                        })
            }
        );
         */

        /** populate with vendor rate data from spreadsheet */
        var vendorArray = [];
        /** populate with your usage data from spreadsheet */
        var usageArray = [];
        /** results array */
        var myDisplayArray = [];
        var myAnnualCostsPerVendorArray = [];

        doc.useServiceAccountAuth({
            client_email: 'energyappuser@energyapp-315301.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCjhKAOshsDsZz6\nsuGwXRJLqshOb1zxyPUVf7uBCu/0zzl/COuzNHeN/NW+8rg+qztU7oMjWJO4rzyC\ncslkdQAS58Zx9E8yTS6LJU7ALgy1y0Dns4Xhc55b2q2vIuQ1MWqWCnylKb8m340t\nILLo/JOd7J9zo3f08RePcq/kAhmaECXSidld2Zb73GcC8iVh1yTNCMs4uJ5LMso+\ngK7hxiLhR+MpVqldmdFeNWHXsBuY2MavVzu+HRDMVK/ArQ822OHytA7nuYIst6Pf\nFv6p17oeqe/KHq3qtU9DGU8fQRTx/IQcJE1KeSOwkbfInfqLYgl13bHyeGOKu7ZE\nKUstEZndAgMBAAECggEAJNzL8Wws42EJxMmJT+c3bef3Bpmb4CT/vURBqrZiwHNr\n4IvMCOb50cBPFmAk8XnMIxou5Yu9J4wXrce/R36J0Pk/tyZOqUYViUhUj8YB1wTW\nYbWKp7fXGhl7AKmyvRwiDWeZUGmQHm0UqDkAJD52b8ptatYN/6HPQCcoaFQh3eVM\nP7NfQiZqaGfnhI8sdAoic68iPQxJQWU4uNJ4CTVbU7qdHyzg+EcbEoepXqkbt/OF\nDWN4dsx+XpDZXiG/lJQD0NIbzgNCb/AqleaK4xDfTtQieSySVgmQF9Msnvy21iYs\n22HuDS7aX01z1qXi2Cdf0hYKPXRD30TSiwdZV7HT6QKBgQDRW1yssGfg7aOVuilU\nuY54+RL3kLBqyiA8eKt2kyC0DFBHRbMS3wWTvtyppLLGWIWhw8io903FTslsDhhT\nyIfavK7T0gTF+ENMSCCBL6zEaO0EdV5Rq9+Dzyydj4PH6sWDIjmiUp72qXNlSoTe\nGmpbopqh/CxL4F8jtJWmiH5t9QKBgQDH8tp0OfrQRU8kE1JViJPUQqe4Z+PGDV+J\noF4eLb5Gii7Y2utBiQfRPt84oh6ZdsxS2jqlZiCu7WA5Zq0VCvWUgHkzgrY7BEct\ngSdvaOe6KAWpzmpP45uesq8tgrQSn8Laf+i+4lVNws/3EARsGWQLl+jCUWM0t/tg\noUvA+PTjSQKBgHhjJxmOn01ymZzh3h6ATXM3FzcRFsFx1bOwWDjpRecDJa62X9E8\nOgLJwC41LTBtevqYkOzIuQn60ky2ljqnl6eq1IWtwVzt9BULbNWcyqZvB8yGiWRB\nh1hObAN2oXr2f/l2VtoG1K5WpqrafSkS25IyIOWBEx/WuB7aGywWVU15AoGBALpu\nE4XfMZ7ToPDwGwqpZ7y30Y49P8FAYt396wOUfx9iZD/KDyRx0hol1xgFASbx/50Y\n4SmqybqQlfGvbJ58M3KdP2Tp8WOhn4QsMkrMs5N9EZq8XZ/Thxw3WuLCRYg/8fys\n2qRwgD0a8bFY++aW3hN5NotIO4nCKd51Rh7NgfgRAoGARBdtapixdU0vXfzwzcxZ\ngHQGeXFpa/QfdwCxoO8qhAj6EBmXt0DoE70L97g6PUdCwrhraxuFr6ekpsd3rjJV\nxWx9KohL87DUgSyVUrP03sVUVzMgmyjm4kDThpNNSq2ZejxN//pny7Q26mtG7UWF\nVdf4ODExT7z3YXnEDmaUkA4=\n-----END PRIVATE KEY-----\n',
          }).then(() => {
              doc.loadInfo().then(() => {
                
                const rateSheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
                
                const usageSheet = doc.sheetsByIndex[0];

                console.log('rateSheet' + rateSheet.a1SheetName  + 'and usageSheet = ' + usageSheet.a1SheetName);
                
                usageSheet.getRows().then((usageRows) =>{
                    usageRows.map((usageRow, index) => {
                        //console.log("<<<<<<<<<<< yahoo >>>>>>>>>>>");
                        //console.log(usageRow.Date_From);
                        const usageForMonth = {
                            fromDate: usageRow.Date_From,
                            toDate: usageRow.Date_To,
                            fromReading: usageRow.Meter_start,
                            toReading: usageRow.Meter_end,
                            heatingValue: usageRow.HV,
                            pressure: usageRow.PV
                        };
                        usageArray.push(usageForMonth);
                    });
                });

                rateSheet.getRows().then((rows) =>{
                    console.log('rate sheet got rows ' + rows);
                    rows.map((row, index) => {
                        console.log('rate row is ' + row.Smr_start );
                        console.log('Vendor is ' + row.Vendor);
                        const vendorRateDetails = {
                            vendor: row.Vendor,
                            dailyCharge: row.Dailycharge,
                            smrStep1: row.Smr_Rate_1,
                            smrStep2: row.Smr_Rate_2,
                            smrStep3: row.Smr_Rate_3,
                            smrStep4: row.Smr_Rate_4,
                            smrStep5: row.Smr_Rate_5,
                            wtrStep1: row.Wtr_Rate_1,
                            wtrStep2: row.Wtr_Rate_2,
                            wtrStep3: row.Wtr_Rate_3,
                            wtrStep4: row.Wtr_Rate_4,
                            wtrStep5: row.Wtr_Rate_5,
                            limitStep1: row.Limit_1,
                            limitStep2: row.Limit_2,
                            limitStep3: row.Limit_3,
                            limitStep4: row.Limit_4,
                            winterStart: row.Wtr_start,
                            winterEnd: row.Wtr_end,
                            summerStart: row.Smr_start,
                            summerEnd: row.Smr_end
                        };
                        vendorArray.push(vendorRateDetails);
                        
                    });
                    
                   console.log('vendorArray length ' + vendorArray.length);
                   console.log('usageArray length ' + usageArray.length);

                    /** do some calculation by iterating over usage array and vendor rate array */
                    vendorArray.map((vendor,index) => {
                        var costForYear = 0;
                        var dailySupplyCost = 0;
                        var usageCost = 0;
                        var costForPeriod = 0;

                        var vendorSummerStartDate = new Date(vendor.summerStart);
                        var vendorSummerEndDate = new Date(vendor.summerEnd);
                        var vendorWinterStartDate = new Date(vendor.winterStart);
                        var vendorWinterEndDate = new Date(vendor.winterEnd);
                        
                        //console.log("Jordan 1 vendor.summerStart = " + vendor.summerStart);
                        //console.log("Jordan 2 vendor.summerStart.month = " + new Date(vendor.summerStart).getMonth());
                        //console.log("Jordan 3 vendor.summerStart.date = " + new Date(vendor.summerStart).getDate());
                        
                        console.log('-------------------------------------------------');
                        console.log('vendor       from                to                bill');
                        usageArray.map((usageForMonth,index) => {
                            var costForPeriod = 0;
                            /** satish start */
                            var isBillOnlyInSummer = false;
                            var isBillOnlyInWinter = false;
                            var isBillSummerIntoWinter = false;
                            var isBillWinterIntoSummer = false;
                            
                            /** calculate number of days  */
                            var dateFrom = new Date(usageForMonth.fromDate);
                            var dateTo = new Date(usageForMonth.toDate);

                            var noOfDays = Math.ceil(Math.abs(dateTo - dateFrom)/((1000 * 60 * 60 * 24)));
                            /** hack to add one more day  */
                            noOfDays = noOfDays + 1;

                            /** calculate usage  in m3 */
                            var usageInM3 = parseInt(usageForMonth.toReading)- parseInt(usageForMonth.fromReading);

                            /** usage in MJ **/ 
                            var usageInMJ = (usageInM3 * parseFloat(usageForMonth.heatingValue) 
                                            * parseFloat(usageForMonth.pressure)).toFixed(2);
                            
                            //console.log('noOfDays = ' + noOfDays + 'usageInMJ = ' + usageInMJ);
                            
                            if(vendor.vendor === 'Globird'){

                                /** step 1 and step 2 usage rate and daily supply rate*/
                                var step1Rate = 0;
                                var step2Rate = 0;
                                var step1Limit = parseInt(vendor.limitStep1);
                                var dailySupplyRate = parseFloat(vendor.dailyCharge);
                                console.log(" summer or winter ");
                                console.log(" dateFrom = " + dateFrom + " and dateTo = " + dateTo);
                                console.log(vendor.summerStart.toDate);
                                console.log(vendor.summerEnd.toDate);
                                /** decide if the bill is for summer or winter or for both ! */
                                
                                console.log("Kobe " + index + " dateFrom.getMonth() " + dateFrom.getMonth() + " dateFrom.getDate() " +
                                dateFrom.getDate());
                                console.log("Kobe " + index + " dateTo.getMonth() " + dateTo.getMonth() + " dateTo.getDate() " +
                                dateTo.getDate());

                                console.log("Kobe " + index + " vendorSummerStartDate.getMonth " + vendorSummerStartDate.getMonth() 
                                + " vendorSummerStartDate.getDate() " +  vendorSummerStartDate.getDate());
                                console.log("Kobe " + index + " vendorSummerEndDate.getMonth " + vendorSummerEndDate.getMonth() 
                                + " vendorSummerEndDate.getDate() " +  vendorSummerEndDate.getDate());
                                
                                if(this.isWinter(dateFrom,dateTo,vendorWinterStartDate,vendorWinterEndDate)){
                                    /** winter */
                                    console.log("shaq " + index + " winter");
                                    isBillOnlyInWinter = true;
                                    step1Rate = parseFloat(vendor.wtrStep1);
                                    step2Rate = parseFloat(vendor.wtrStep2);
                                }else if (this.isWinterIntoSummer(dateFrom,dateTo,vendorWinterStartDate,vendorWinterEndDate)){
                                    /** winter into summer */
                                    console.log("shaq " + index + " winter into summer ");
                                    isBillWinterIntoSummer = true;
                                }else if(this.isSummerIntoWinter(dateFrom,dateTo,vendorWinterStartDate,vendorWinterEndDate)){
                                    /** summer into winter */
                                    console.log("shaq " + index + " summer into winter ");
                                    isBillSummerIntoWinter = true;
                                }else{
                                    /** summer  */
                                    console.log("shaq " + index + " summer ");
                                    isBillOnlyInSummer = true;
                                    step1Rate = parseFloat(vendor.smrStep1);
                                    step2Rate = parseFloat(vendor.smrStep2);
                                }
                                
                                console.log("kobe " + index + ' step1Rate= ' + step1Rate + ' step2Rate= ' + step2Rate );
                                console.log("kobe " + index + ' step1Limit= ' + step1Limit + ' dailySupplyRate= ' + dailySupplyRate );
                               
                                /** calculate step 1 cost  */
                                var step1Cost = 0;
                                var step2Cost = 0;
                               
                                if(usageInMJ < (noOfDays * step1Limit)){
                                     /** usage is less than step 1 limit */
                                    step1Cost = step1Rate * usageInMJ;
                                }else{
                                     /** usage is >= step 1 limit */
                                    step1Cost = step1Rate * noOfDays * step1Limit;
                                    /** calculate step 2 cost  */
                                    step2Cost = step2Rate * (usageInMJ - (noOfDays * step1Limit));
                                }
                                
                                console.log("kobe " + index + ' step1Cost= ' + step1Cost + ' step2Cost= ' + step2Cost );

                                /** usage cost **/ 
                                usageCost = step1Cost + step2Cost;
                               
                                console.log("kobe " +  index + ' usageCost= ' + usageCost );
                                /** calculate daily supply cost  */
                                dailySupplyCost = dailySupplyRate * noOfDays;

                                console.log("kobe " + index + ' dailySupplyCost= ' + dailySupplyCost );
                                /** calculate total cost */
                                costForPeriod = usageCost + dailySupplyCost ;
                                
                                console.log("kobe " + index + ' costForMonth= ' + costForPeriod );

                                /** satish end  */
                                costForYear = costForYear + costForPeriod;
                                //console.log('costForYear for Globird is ' + costForYear);
                            }else if(vendor.vendor === 'Tango'){
                                var step1Rate = parseFloat(vendor.smrStep1);
                                var step2Rate = parseFloat(vendor.smrStep2);
                                var step3Rate = parseFloat(vendor.smrStep3);
                                var step4Rate = parseFloat(vendor.smrStep4);
                                var step5Rate = parseFloat(vendor.smrStep5);

                                var step1Limit = parseInt(vendor.limitStep1);
                                var step2Limit = parseInt(vendor.limitStep2);
                                var step3Limit = parseInt(vendor.limitStep3);
                                var step4Limit = parseInt(vendor.limitStep4);                                
                                
                                /** calculate limit based on days  */
                                step1Limit = step1Limit * noOfDays;
                                step2Limit = step2Limit * noOfDays;
                                step3Limit = step3Limit * noOfDays;
                                step4Limit = step4Limit * noOfDays;

                                var dailySupplyRate = parseFloat(vendor.dailyCharge);

                                /** calculate costs based on steps  */
                                var cost = 0;
                                if(usageInMJ >= step4Limit){
                                    cost = cost + ((usageInMJ-step4Limit) * step5Rate);
                                    cost = cost + ((usageInMJ-step3Limit) * step4Rate);
                                    cost = cost + ((usageInMJ-step2Limit) * step3Rate);
                                    cost = cost + ((usageInMJ-step1Limit) * step2Rate);
                                    cost = cost + (step1Limit * step1Rate);
                                }else if(usageInMJ >= step3Limit){
                                    cost = cost + ((usageInMJ-step3Limit) * step4Rate);
                                    cost = cost + ((usageInMJ-step2Limit) * step3Rate);
                                    cost = cost + ((usageInMJ-step1Limit) * step2Rate);
                                    cost = cost + (step1Limit * step1Rate);
                                }else if(usageInMJ >= step2Limit){
                                    cost = cost + ((usageInMJ-step2Limit) * step3Rate);
                                    cost = cost + ((usageInMJ-step1Limit) * step2Rate);
                                    cost = cost + (step1Limit * step1Rate);
                                }else if(usageInMJ >= step1Limit){
                                    cost = cost + ((usageInMJ-step1Limit) * step2Rate);
                                    cost = cost + (step1Limit * step1Rate);
                                }else{
                                    cost = cost + (step1Limit * step1Rate);
                                }
                                
                                 /** usage cost **/ 
                                 usageCost = cost;
 
                                /** calculate daily supply cost  */
                                dailySupplyCost = dailySupplyRate * noOfDays;

                                /** calculate total cost */
                                costForPeriod = usageCost + dailySupplyCost ;
                                
                                /** satish end  */
                                costForYear = costForYear + costForPeriod; 

                                //console.log('costForYear for Tango is ' + costForYear);
                                
                            }//if vendor is Tango
                            console.log(vendor.vendor + "       " + usageForMonth.fromDate + "     " + usageForMonth.toDate + "        " + costForPeriod.toFixed(2) );
                            /** push to result array */
                            myDisplayArray.push({"vendor":index + " " + vendor.vendor,"fromDate":usageForMonth.fromDate,
                            "toDate":usageForMonth.toDate,"days": noOfDays,"mj": usageInMJ,"usageCost" : parseFloat(usageCost).toFixed(2),
                            "dailySupplyCost" : parseFloat(dailySupplyCost).toFixed(2), "totalCost": costForPeriod.toFixed(2)});

                        });//for each month's bill
                        //console.log("cost for " + vendor.vendor + " is ",costForYear);
                        myAnnualCostsPerVendorArray.push({"vendor":vendor.vendor ,"annualBill": costForYear.toFixed(2)});
                    });// for each vendor

                    /** sort the annual cost per vendor array to ensure we show best vendor first */
                    myAnnualCostsPerVendorArray.sort((a, b) => parseFloat(a.annualBill) - parseFloat(b.annualBill));

                    this.setState(
                        { vendorRatesArray: vendorArray,yearlyConsumptionArray:usageArray,myName: usageSheet.title,
                            displayArray: myDisplayArray,annualCostsPerVendorArray:myAnnualCostsPerVendorArray }
                   ); 
                });   
              });
          });
        
    
      
      // loads document properties and worksheets
    
      console.log('after');

      
  
  
    }

    render(){ 
        return(
            <React.Fragment>
            <h3>Energy Bills</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>Reading from</th>
                        <th>Reading to</th>
                        <th>m3</th>
                        <th>HV</th>
                        <th>PV</th>
                        <th>MJ</th>
                        <th>Usage cost</th>
                        <th>supply Cost</th>
                        <th>Total cost</th>
                    </tr>
                </thead>
               
                <tbody>
                    {this.state.displayArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.vendor}</td>
                            <td>{energyBill.fromDate}</td>
                            <td>{energyBill.toDate}</td>
                            <td>{energyBill.days}</td>
                            
                            <td>{energyBill.fromReading}</td>
                            <td>{energyBill.toReading}</td>
                            <td>{energyBill.m3}</td>
                            <td>{energyBill.heatingValue}</td>
                            <td>{energyBill.pressure}</td>
                            <td>{energyBill.mj}</td>
                            <td>{energyBill.usageCost}</td>
                            <td>{energyBill.dailySupplyCost}</td>
                            <td>{energyBill.totalCost}</td>
                                                      
                        </tr>);

                    })}
                </tbody>
            </table>

            <h3>Vendor Comparison </h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>Vendor</th>
                        <th>Annual cost</th>
                    </tr>
                </thead>
               
                <tbody>
                    {this.state.annualCostsPerVendorArray.map((annualCostsPerVendor,id) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{id+1}</td>
                            <td>{annualCostsPerVendor.vendor}</td>
                            <td>{annualCostsPerVendor.annualBill}</td>
                                                      
                        </tr>);

                    })}
                </tbody>
            </table>
            </React.Fragment>
        );
    }
}

export default EnergyComparison;