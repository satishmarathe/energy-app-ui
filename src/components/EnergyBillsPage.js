import React from "react";
import {getListOfEnergyBills} from "../api/energyBillsApi.js";
import axios from "axios";


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
            <h3>Energy Bills</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author ID</th>
                        <th>Category</th>
                    </tr>
                </thead>

                <tbody>
                    {this.state.energyBillsArray.map((energyBill) => {
                        //console.log(energyBill);
                        return (<tr>
                            <td>{energyBill.id}</td>
                            <td>{energyBill.vendor}</td>
                            <td>{energyBill.days}</td>
                        </tr>);

                    })}
                </tbody>
            </table>
            </React.Fragment>
        );
    }
}
export default EnergyBillsPage;