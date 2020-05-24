import React from "react";
import {getListOfEnergyBills} from "../api/energyBillsApi.js";


class EnergyBillsPage extends React.Component{
    /** we will store the api results in a state */
    /** in class components state is initialised in constructor */
    /** constructor accepts 'props' as a parameter */
    /** first line in constructor must be to super(props) to ensure parent is called first */
    constructor(props){
        super(props);

        /** now declate state */
        this.state = {
            /** we will getback an array of Energy Bills so we define a property to hold an array */
            energyBillsArray: []
        }
    }

    /** we want to get list of energy bills when this page loads i.e. set some state when the page loads  
     *  The best place to do this is to use the lifecycle method : componentDidMount
     *  This method is called immediately after the component is mounted
    */
   componentDidMount(){
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
           this.setState(
                { energyBillsArray: getListOfEnergyBills() }
           );        
   }
    render(){
        
        return(
            <h3>Energy Bills1</h3>
        );
    }
}
export default EnergyBillsPage;