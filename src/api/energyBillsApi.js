import axios from "axios";
/** define the endpoint to be called */
const baseUrl = process.env.REACT_APP_API_URL + "/energyBills/";

/** this function will retrieve the list of energy bills */
export function getListOfEnergyBills(){
    console.log("about to call api");
    /**
    axios.get(baseUrl)
        .then((data) => console.log(data));
     */

     /** if we use axios library then the response payload will always be inside 'data' attribute
      *  so here we use the {data} 
      */
    axios.get(baseUrl).then(({data}) => {
        console.log(data);
        console.log(JSON.stringify(data));
        return JSON.stringify(data);
    })
    console.log("after making the call to the api")
}