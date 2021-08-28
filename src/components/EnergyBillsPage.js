import React from "react";
import {getListOfEnergyBills} from "../api/energyBillsApi.js";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import EnergyBillForm from "./EnergyBillForm.js"


class EnergyBillsPage extends React.Component{
    /** we will store the api results in a state */
    /** in class components state is initialised in constructor */
    /** constructor accepts 'props' as a parameter */
    /** first line in constructor must be to super(props) to ensure parent is called first */
    constructor(props){
        super(props);

        /** now declate state */
        this.state = {
            isLoaded: false,
            /** we will getback an array of Energy Bills so we define a property to hold an array */
            energyBillsArray: []
            
        }
    }

    /** we want to get list of energy bills when this page loads i.e. set some state when the page loads  
     *  The best place to do this is to use the lifecycle method : componentDidMount
     *  This method is called immediately after the component is mounted
    */
   componentDidMount(){
       console.log("<<< inside componentDidMount >>>")
       /** this is the proper lifecycle method for making api calls
        *  the component MUST be mounted before the state is set
        *  since the component is mounted before this below api run is done we can set state here
        */
       //getListOfEnergyBills();
       //getListOfEnergyBills().then((energyBillsResponseFromApi) => {
           /** we now got the results from api call and need to set the result to the state of this class */

           /** setting state MUST happen using setState and no other way - this is important */
           /** NOTE below call to setState will ONLY modify the attribute 'energyBillsArray' of state
            *  if there were other attributes / properties in state they would not get impacted / modified
            *  so setState is more like setters for individual properties 
            *  you can change multiple properties in one setter OR call setState for each property you want to change !
            */
           /**
           console.log(energyBillsResponseFromApi);
          **/
         /** define the endpoint to be called */
        const baseUrl = process.env.REACT_APP_API_URL + "/energyBills/";
        axios.get(baseUrl).then(({data}) => {
            //console.log(data);
            //console.log(JSON.stringify(data));
            this.setState(
                { energyBillsArray: data }
           );            
        })
                   
   }
    render(){ 
        console.log("@@@ inside render array is @@@",this.state.energyBillsArray)
        //console.log(this.state.energyBillsArray) ;      
        return(
            <React.Fragment>
            <EnergyBillForm onSubmitAddBillCallback={this.onSubmitAddBillCallback} />
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
                    {this.state.energyBillsArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.id}</td>
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
            </React.Fragment>
        );
    }

    onSubmitAddBillCallback = (energyBillRecord) => {
        console.log("<<<<<< am I getting called ? >>>>>> ",energyBillRecord);

        /** now calculate bill  */

        /** calculate number of days  */
        var dateFrom = new Date(energyBillRecord.fromDate);
        var dateTo = new Date(energyBillRecord.toDate);

        var noOfDays = Math.abs(dateTo - dateFrom)/((1000 * 60 * 60 * 24));
        /** hack to add one more day  */
        noOfDays = noOfDays + 1;

        /** set the number of days  */
        energyBillRecord["days"] =  noOfDays;

        /** calculate usage  in m3 */
        var usageInM3 = parseInt(energyBillRecord.toReading)- parseInt(energyBillRecord.fromReading);

       
         /** set usage  in m3 */
        energyBillRecord["m3"] =  usageInM3 ;

        /** usage in MJ **/ 
        var usageInMJ = (usageInM3 * parseFloat(energyBillRecord.heatingValue) 
        * parseFloat(energyBillRecord.pressure)).toFixed(2);

         /** set usage  in MJ */
         energyBillRecord["mj"] =  usageInMJ ;

        /** step 1 and step 2 usage rate and daily supply rate*/
        var step1Rate = 0.0209;
        var step2Rate = 0.0154;
        var step1Limit = 100;
        var dailySupplyRate = 0.682

        /** calculate step 1 cost  */
        var step1Cost = step1Rate * noOfDays * step1Limit;
        
        /** calculate step 2 cost  */
        var step2Cost = step2Rate * (usageInMJ - (noOfDays * step1Limit));

        /** calculate daily supply cost  */
        var dailySupplyCost = dailySupplyRate * noOfDays;

        /** calculate total cost */
        var totalCost = step1Cost + step2Cost + dailySupplyCost ;
        
        /** set costs in object */
        energyBillRecord["usageCost"] =  (step1Cost + step2Cost).toFixed(2) ;

        energyBillRecord["dailySupplyCost"] =  dailySupplyCost.toFixed(2) ;

        energyBillRecord["totalCost"] =  totalCost.toFixed(2) ;

        console.log("number of days = " ,(Math.abs(dateTo - dateFrom))/((1000 * 60 * 60 * 24)));
        /** once on the UI we have added a survey we need to update the state  */
        this.setState(
                        {
                            energyBillsArray: [...this.state.energyBillsArray, energyBillRecord],
                            isLoaded: true
                        }
        );
        
        /** next step is to make a call to REST API to save in backend */
        console.log("<<<<< call to REST API to ADD energy bill record goes here >>>>>>>>>>");
        /** lets first try and delete from JSON Server , later we will switch to actual Spring boot endpoint */
        //const baseUrl = process.env.REACT_APP_API_URL + "/api/v1/surveys/" + surveyRecord.treeId;
        const baseUrl = process.env.REACT_APP_API_URL + "/api/v1/energyBills";
        
        console.log(baseUrl)

        axios.post(baseUrl,{
                            "id": energyBillRecord.id,
                            "fromDate":energyBillRecord.fromDate,
                            "toDate": energyBillRecord.toDate,
                            "days": '',
                            "fromReading": energyBillRecord.fromReading,
                            "toReading": energyBillRecord.toReading,
                            "m3": '',
                            "heatingValue": energyBillRecord.heatingValue,
                            "pressure": energyBillRecord.pressure,
                            "mj" : '',
                            "usageCost": '',
                            "dailySupplyCost": '',
                            "totalCost": ''                                                   
                        })
        .then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error);
        });  
    }
}
export default EnergyBillsPage;