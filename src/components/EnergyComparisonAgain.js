import React from "react";
import { GoogleSpreadsheet } from "google-spreadsheet";
import EnergyComparisonResult from "./EnergyComparisonResult.js";

// Initialize the sheet - doc ID is the long id in the sheets URL

class EnergyComparisonAgain extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            myName: '',
            vendorRatesArray: [],
            yearlyConsumptionArray: [],
            displayArray: [],
            annualCostsPerVendorArray: [] ,
            operatingCostArray: [],
            comparisonArray: []      
        }  
    }

    componentDidMount(){
        console.log('inside  componentDidMount');
        const doc = new GoogleSpreadsheet('1iLQEKzgKdDEytDXeUA5xBwBS4QMlobQTG4VHSjAdnY0');        

        /** populate with vendor rate data from spreadsheet */
        var vendorArray = [];
        /** populate with your usage data from spreadsheet */
        var usageArray = [];
        /** daily rates for each vendor */
        var dailyRatePerVendorMap = new Map();
        /** results array */
        var myDisplayArray = [];
        var myAnnualCostsPerVendorArray = [];
        var opexArray = [];
        var compArray = [];

        //console.log('inside  componentDidMount calling async rest api');
        doc.useServiceAccountAuth({
            client_email: 'energyappagainserviceacct@energyappagain.iam.gserviceaccount.com',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDakzEb9NfQwSaJ\nxPo6HRhHMZx4XQO8Wg3rtp7HE+BUdGxQeqWltOBCXkYHlfOUzMLXKRQ3InpFzQ3X\n2QCSbXAg3LD7VtyzDMkV21Ye2Wox2eDBVHdlht6+qMacLDsitpU3PsVAkd9hQk87\n5Z/3TJJ6ujmfJh6plVkpMar95VP3bqRuJaX2qzo3SE8LMIm/866CudGefsJmmXir\n0vRtC9M7WSFYLc0hH1CMxKadOVWUpzaBONQU+dfvGy5kMyMU+z/Bb1XjxhkyluOo\nY0QIJuUMBYq9vPY8dMy6Ma1MKqsYZdHKpPDLxd5hvtb9wtkGGfSPqKBOtecbA5kE\ni2WZAFU3AgMBAAECggEAHu49wK6HzIdLcas5xnfajoHt72HTnFeuvktUBxOq0a4T\nVoTcpGlHDlfyl104IIz6CjefyuOVTlkOW0az8YS3cuG4JoEsGdG2h7dyZaAvtR6X\nfdRQUcI3Ct+tvL5M9K8bc5DC73hqa4Qrhpbf6b+LalRTFiXvUzaKwlfAfPhzHEGS\nsu26gCCqDSsQQnY3MF6IBjfBGmbtBz+ZwhEP+7aNJ7y4Es8cnALeFguu2GTsMhab\n9TijZNxatLDXi2/UHCDG179CDXLd0QdkElwMs5kAox3cjisyVxw6ZX1fH7Cyd8fR\n9lIC5IEYQg9Zn0RtxOPFv0grcRWBV3Jer8m0fRJIQQKBgQD/IWX/tJ7hUYgo7jNL\nONa0SMdrs+Cl+PufhbprzqXcp25tzm2/MsYdr6b0Gg2o3WkqXu+lXyMvNHLPCaVK\nYPKdhLvq2KLYLHLHiqzNcQgMFQDNs5PnP6HWztIfK3xLXl6qrl32JUdoNWshN3Hc\np5ljs6+hXwADLgvlvkTIa+GidwKBgQDbUeYQ/I094f94BYD/GNlrsW9a690TobNx\neEbOGAl5/Fu74f5hgt/mv9NnxN5uziihX2XCFx//+mb2xRt5doW3KPKeDvHTvWLa\nwyfqsi4enoRV8uI1i7+xcogCeZaD91YxhuRjGg+tO77FINKJmmj02Ni2P8tkFfBx\nBFtfmCLTQQKBgQCpLrmXxmuxWMKk+chT8n4WEUkEt8SZ6zDYyPIlOWStnO3SrRgD\nuSS9XNSmfHxgZWquqUPbcuo/DFWxy2CroPxhzjpa8ouSNG9suR38Ih9G+8qLnbDP\noVetvXqDJvAGfq7iGjy+1Fu00++VmFHOE+nYvrgRl5DHiwpisDimezul4wKBgF1u\nW1NbM5RsRZfMyHJkFKODOEwEdO7bEQXC1m8P4GGeNzooAWVrCpVTnOz0+kk7/CUa\n7c+saE51Tw3LVHP/IOGxSQI6nZy1bnqBbuzVsT4MC5ZN3T4wZZ5jizt6rrtTT93T\neFIblRgYfqGd5PMH27SK+G9TaAMgMYkD8SUdO6DBAoGBAPWKOeyaDfLZ7eKH03Qy\nNqUVJyICJ7YHTuHcu8wOrgMQjZVU703k4m4EARV3s3qBq95G1Ea473/GU2JdVh4P\nme79Z2zPiW6jDRZx64Gmx8OeqlRL0yQoZY8zD5C0h1x5d80qu0noU0hKJWUCb1zh\n3Jzw10et8Xwu+lK3a2oJtJ/3\n-----END PRIVATE KEY-----\n',
          }).then(() => {
              doc.loadInfo().then(() => {
                
                const seasonSheet = doc.sheetsByIndex[3];
                const dailyRateSheet = doc.sheetsByIndex[4];
                const stepsSheet = doc.sheetsByIndex[5];

                const rateSheet = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
                
                const usageSheet = doc.sheetsByIndex[0];

                /** populate the daily rates for each vendor */
                dailyRateSheet.getRows().then((dailyRateRows) =>{
                    dailyRateRows.map((dailyRateRow, index) => {
                        dailyRatePerVendorMap.set(dailyRateRow.Vendor,dailyRateRow.Daily_rate);
                    });
                });


                //console.log('rateSheet' + rateSheet.a1SheetName  + 'and usageSheet = ' + usageSheet.a1SheetName);
                //console.log('seasonSheet' + seasonSheet.a1SheetName  + 'and dailyRateSheet = ' + dailyRateSheet.a1SheetName);
                //console.log('stepsSheet' + stepsSheet.a1SheetName ); 
                //console.log('AFTER receiving response from API');  
                
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


                /** go over each month's usage */
                usageSheet.getRows().then((usageRows) =>{
                    usageRows.map((usageRow, indexUsage) => {
                        
                        console.log("index is " + indexUsage);
                        /** for each row of usage */
                        /** get start date , end date , MJ used and no of days */
                        var startDate = usageRow.Date_From;
                        var endDate = usageRow.Date_To;
                        var usageInMJ = usageRow.MJ;
                        var balanceUsageInMJ = usageInMJ;
                        var noofDays = usageRow.days;
                        var isTangoCalcDone = false;
                        var isGlobirdCalcDone = false;


                        //console.log("for usage from and to " + startDate + endDate);

                        /** initialise variables for calculations */
                        var opCost = 0;
                        
                        /** now go through ech vendor's rates */                        
                        stepsSheet.getRows().then((stepRows) =>{ 
                            stepRows.map((stepRow, index) => {                           
                                //console.log("step sheet details are " + stepRow.Vendor);
                                /** calculations for Tango Energy */
                                if((stepRow.Vendor) === "Tango" && !isTangoCalcDone){
                                    //console.log("yes this is tango and balance is " + balanceUsageInMJ);
                                    if(balanceUsageInMJ > 0){
                                        /** get the limit for each step and its rate */
                                        var stepLimit = stepRow.Step_limit;
                                        var stepRate = stepRow.Step_rate;

                                        //console.log("stepLimit = " + stepLimit);
                                        //console.log("stepRate = " + stepRate);

                                        /** determine what is the max usage allowed for this step */
                                        var stepLimitForDays = stepLimit * noofDays;

                                        //console.log("stepLimitForDays = " + stepLimitForDays);
                                    
                                        /** is our usage more than allowed limit ? */
                                        if(balanceUsageInMJ > stepLimitForDays){
                                            /** we have used more than allowed limit so calculate
                                            * cost for usage for that step - we still have 
                                            * more usage to be calculated at next step
                                            */
                                            opCost = opCost + (stepLimitForDays * stepRate);

                                            //console.log("opCost = " + opCost);

                                            /** now decrease usage by limit of this step */
                                            balanceUsageInMJ = balanceUsageInMJ - stepLimitForDays;
                                            //console.log("balanceUsageInMJ = " + balanceUsageInMJ);
                                        }else{
                                            /** we are below limit for this step*/
                                            opCost = opCost + (balanceUsageInMJ * stepRate);
                                            /** we are done with calculations for this month restore*/
                                            balanceUsageInMJ = usageInMJ;

                                            /** set flag to indicate we are done for Tango */
                                            isTangoCalcDone = true;

                                            //console.log("opCost when bal is less = " + opCost);

                                            /** get data ready for reporting */
                                            
                                            /** calculate daily cost  = noOfDays * dailyRate */
                                            var dailyCost = noofDays * (dailyRatePerVendorMap.get(stepRow.Vendor));
                                            var totCost = dailyCost +  opCost;
                                            opexArray.push({
                                                "sr": index,
                                                "vendor": "Tango",
                                                "fromDate":usageRow.Date_From,
                                                "toDate":usageRow.Date_To,
                                                "noOfDays": usageRow.days,
                                                "m3": usageRow.m3,
                                                "mj": usageRow.MJ,
                                                "opEx": opCost ,
                                                "dailyEx": dailyCost,
                                                "totEx": totCost                                      
                                            });

                                            /** try and retrieve object from array at index position */
                                            if (typeof compArray[indexUsage] !== 'undefined' 
                                                && compArray[indexUsage] !== null) {
                                                    var xyz = compArray[indexUsage];
                                                    /** add an attribute to the object */
                                                    xyz.Tango = totCost;
                                                    /** now set this object back into the array */
                                                    compArray[indexUsage] = xyz;
                                                }else{
                                                    /** object not found in array - so create one */
                                                    compArray.push({
                                                        "sr": index,
                                                        "fromDate":usageRow.Date_From,
                                                        "toDate":usageRow.Date_To,
                                                        "noOfDays": usageRow.days,
                                                        "Tango": totCost                                      
                                                    });
                                                }

                                            
                                            /** reset opCost */
                                            opCost = 0;  
                                        }
                                    }// if(balanceUsageInMJ > 0)                                
                                }// if((stepRow.Vendor) === "Tango")
                                else if((stepRow.Vendor) === "Globird" && !isGlobirdCalcDone){
                                    //console.log("yes this is Globird and balance is " + balanceUsageInMJ);
                                    if(balanceUsageInMJ > 0){
                                        /** get the limit for each step and its rate */
                                        var stepLimit = stepRow.Step_limit;
                                        var stepRate = stepRow.Step_rate;

                                        //console.log("globird stepLimit = " + stepLimit);
                                        //console.log("globird stepRate = " + stepRate);
                                        //console.log("globird balanceUsageInMJ = " + balanceUsageInMJ);
                                        
                                        /** determine what is the max usage allowed for this step */
                                        var stepLimitForDays = stepLimit * noofDays;

                                        //console.log("globird stepLimitForDays = " + stepLimitForDays);
                                    
                                        /** is our usage more than allowed limit ? */
                                        if(balanceUsageInMJ > stepLimitForDays){
                                            /** we have used more than allowed limit so calculate
                                            * cost for usage for that step - we still have 
                                            * more usage to be calculated at next step
                                            */
                                            opCost = opCost + (stepLimitForDays * stepRate);

                                            //console.log("globird opCost = " + opCost);

                                            /** now decrease usage by limit of this step */
                                            balanceUsageInMJ = balanceUsageInMJ - stepLimitForDays;
                                            //console.log("globird balanceUsageInMJ = " + balanceUsageInMJ);
                                        }else{
                                            /** we are below limit for this step*/
                                            opCost = opCost + (balanceUsageInMJ * stepRate);
                                            /** we are done with calculations for this month restore*/
                                            balanceUsageInMJ = usageInMJ;

                                            /** set flag to indicate we are done for Tango */
                                            isGlobirdCalcDone = true;

                                            //console.log("globird opCost when bal is less = " + opCost);

                                            /** get data ready for reporting */
                                            
                                            /** calculate daily cost  = noOfDays * dailyRate */
                                            var dailyCost = noofDays * (dailyRatePerVendorMap.get(stepRow.Vendor));
                                            var totCost = dailyCost +  opCost;
                                            /** globird offers a 2% discount  */
                                            totCost = totCost * 0.98;

                                            opexArray.push({
                                                "sr": index,
                                                "vendor": "Globird",
                                                "fromDate":usageRow.Date_From,
                                                "toDate":usageRow.Date_To,
                                                "noOfDays": usageRow.days,
                                                "m3": usageRow.m3,
                                                "mj": usageRow.MJ,
                                                "opEx": opCost ,
                                                "dailyEx": dailyCost,
                                                "totEx": totCost                                      
                                            });
                                            /** try and retrieve object from array at index position */
                                            if (typeof compArray[indexUsage] !== 'undefined' 
                                                && compArray[indexUsage] !== null) {
                                                    var xyz = compArray[indexUsage];
                                                    /** add an attribute to the object */
                                                    xyz.Globird = totCost;
                                                    /** now set this object back into the array */
                                                    compArray[indexUsage] = xyz;
                                                }else{
                                                    /** object not found in array - so create one */
                                                    compArray.push({
                                                        "sr": index,
                                                        "fromDate":usageRow.Date_From,
                                                        "toDate":usageRow.Date_To,
                                                        "noOfDays": usageRow.days,
                                                        "Globird": totCost                                      
                                                    });
                                                }
                                            
                                            
                                            
                                            /** reset opCost */
                                            opCost = 0;     
                                        }
                                    }// if(balanceUsageInMJ > 0) 
                                }// if((stepRow.Vendor) === "Globird")
                            }); // for each row of step rates
                            /** CRITICAL Learning : My page was not showing data 
                             *  since the setState was OUTSIDE of getRows.then
                             *  I did not realise that this call itself is async 
                             *  so setState MUST be inside AFTER we get response !!!
                             */
                            this.setState(
                                {   vendorRatesArray: vendorArray,
                                    yearlyConsumptionArray:usageArray,
                                    myName: usageSheet.title,
                                    displayArray: myDisplayArray,
                                    annualCostsPerVendorArray:myAnnualCostsPerVendorArray,
                                    operatingCostArray: opexArray,
                                    comparisonArray: compArray
                                }
                            );
                        });// async call to google sheet to get data                         
                    }); // for each row of usage
                });
                    
                
                                      
              });
          });// end of async response processing from api
          //console.log('inside  componentDidMount exiting ...');          
    }

    render(){ 
        //console.log("<<<< inside render >>>>>>")
        return(
            <React.Fragment>
            <h3>Energy Total Cost Comparison</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Tango</th>
                        <th>Globird</th>                        
                    </tr>
                </thead>
               
                <tbody>
                    {this.state.comparisonArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.sr}</td>
                            <td>{energyBill.fromDate}</td>
                            <td>{energyBill.toDate}</td>
                            <td>{energyBill.Tango}</td>
                            <td>{energyBill.Globird}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
            <h3>Energy Compare</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>Vendor</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Daily cost</th>
                        <th>Usage cost</th>
                        <th>Total cost</th>
                        
                    </tr>
                </thead>
               
                <tbody>
                    {this.state.operatingCostArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.sr}</td>
                            <td>{energyBill.vendor}</td>
                            <td>{energyBill.fromDate}</td>
                            <td>{energyBill.toDate}</td>
                            <td>{energyBill.dailyEx}</td>
                            <td>{energyBill.opEx}</td>                            
                            <td>{energyBill.totEx}</td>
                        </tr>);
                    })}
                </tbody>
            </table>
            <h3>Energy Usage</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sr#</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Days</th>
                        <th>m3</th>
                        <th>MJ</th>
                    </tr>
                </thead>
               
                <tbody>
                    {this.state.yearlyConsumptionArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.vendor}</td>
                            <td>{energyBill.fromDate}</td>
                            <td>{energyBill.toDate}</td>
                            <td>{energyBill.days}</td>
                            <td>{energyBill.m3}</td>
                            <td>{energyBill.mj}</td>  
                        </tr>);
                    })}
                </tbody>
            </table>

            
            </React.Fragment>
        );
    }
}

export default EnergyComparisonAgain;