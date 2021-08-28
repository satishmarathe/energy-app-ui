import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import {EnergyBillAdd} from "../styles/EnergyBillFormStyle.js";

const initialState = {
  id: '',
  fromDate: '',
  toDate: '',
  days: '',
  fromReading: '',
  toReading: '',
  m3: '',
  heatingValue: '',
  pressure: '',
  mj: '',
  usageCost: '',
  dailySupplyCost: '',
  totalCost: '',
  errors: {}
}



class EnergyBillForm extends React.Component{

  constructor(props){
    super(props);

    /** now initialise state  */
    this.state = initialState;
}

handleChange = event => {
    /** here all we are doing is destructuring : we are extracting the values and setting to 'name' and 'value' */
    const { name, value } = event.target;
    
    this.setState({
        /** this wierd [name] syntax  is probably 'detructuring' but is meaningless here as per me */
        [name] : value
    });
    
    console.log("inspection 1 " + this.state.errors[name]);
    console.log("inspection 1 ! " + !this.state.errors[name]);
    console.log("inspection 2 !1 " + !!this.state.errors[name]);
    /** check if the errors js object has any property represented by 'name' */
    /** here due to javascript majic 'name' represents any of the various data entry fields we have */
    /** as an example name = heatingValue if there was a validation error for heatingValue field */
    /** this would mean the errors js object will have a property called 'heatingValue' */
    
    /** in below if condition we are using !! which is two not conditions   */
    /** so all we are trying to check is whether the 'errors' js object has a property 'name' ( 'name' could be 'heatingValue') */
    /** if it has such a property enter the if condition and clear off the property */
    if ( !!this.state.errors[name] ){
        //this.setState({...this.state.errors,[name] : value});

        /** here we are deleting from errors js object property represented by 'name'  */
        /** as states above 'name' is a placeholder and it will denote different form fields when they change */
        delete this.state.errors[name];
    }
  }

  onFormClear = () => {
    console.log("<<<<<<< in here ! >>>>>>>")
    this.setState(this.initialState);
    
    /** reset state for all attributes  */
    this.setState({"id": '',"fromDate":'',"toDate": '',"days": '',"fromReading": '',
    "toReading": '',"m3": '',"heatingValue": '',"pressure": '',"mj": '',
    "usageCost": '',"dailySupplyCost": '',"totalCost": ''});

    
    /** start  */
    /** end  */
  }

    onFormSubmit = () => {
      console.log("<<<<<<< in here onFormSubmit ! >>>>>>>");
      /** satish test start */
      const newErrors = {}

      if ( !this.state.fromDate || this.state.fromDate === '' ){
        newErrors.fromDate = 'Start Date for billing needs to be selected';        
      }

      if ( !this.state.toDate || this.state.toDate === '' ){
        newErrors.toDate = 'End Date for billing needs to be selected';        
      }     

      console.log("toDate = " + this.state.toDate);
      console.log("fromDate = " + this.state.fromDate);

      if ( this.state.toDate && this.state.fromDate ){
        
          console.log("<<<<<< 2 >>>>>>>");
          /** fromDate is not null or empty  */
          /** check to ensure toDate >=  fromDate */
          var dateTo = new Date(this.state.toDate);
          var dateFrom = new Date(this.state.fromDate);
          if(dateTo < dateFrom){
            console.log("<<<<<< 3 >>>>>>>");
            /** inspection date cannot be less than plantation date ! */
            newErrors.toDate = 'Billing end Date must be greater than Billing start Date';
          }
        
      }

      if ( !this.state.heatingValue || this.state.heatingValue === '' ){
        newErrors.heatingValue = 'Heating value cannot be blank';        
      } 

      if ( !this.state.pressure || this.state.pressure === '' ){
        console.log('we have an issue with pressure')
        newErrors.pressure = 'Pressure value cannot be blank';        
      } 

      if ( !this.state.fromReading || this.state.fromReading === '' ){
        newErrors.fromReading = 'Start of meter reading cannot be blank';        
      } 

      if ( !this.state.toReading || this.state.toReading === '' ){
        newErrors.toReading = 'End of meter reading cannot be blank';        
      } 
      
      
      
      if ( Object.keys(newErrors).length > 0 ) {
        // We got errors!
        //setErrors(newErrors)
        this.setState(
          {             
            errors: newErrors
          });
      } else {
        // No errors! Put any logic here for the form submission!
        //alert('Thank you for your feedback!')
        this.props.onSubmitAddBillCallback(this.state);
        //this.setState(this.initialState);

        /** reset state for all attributes  */
        this.setState({"id": '',"fromDate":'',"toDate": '',"days": '',"fromReading": '',
                      "toReading": '',"m3": '',"heatingValue": '',"pressure": '',"mj": '',
                      "usageCost": '',"dailySupplyCost": '',"totalCost": ''});
      }      
    }

  
    render(){ 
        return(
          <div style={EnergyBillAdd}>
          <Form>
          
          <Form.Row className="align-items-center">
            <Col sm={1.5} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
              fromDate
              </Form.Label>
              <Form.Control  type="date" id="fromDate" name="fromDate" value={this.state.fromDate} placeholder="" 
                isInvalid={ !!this.state.errors.fromDate } onChange={this.handleChange} />
                <Form.Control.Feedback type='invalid'>
              { this.state.errors.fromDate }
              </Form.Control.Feedback>
            </Col>
            
            <Col sm={1.5} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
              toDate
              </Form.Label>
              <Form.Control type="date" id="toDate" name="toDate" value={this.state.toDate} placeholder="date of Inspection : mm/dd/yyyy" 
              isInvalid={ !!this.state.errors.toDate } onChange={this.handleChange} />
              <Form.Control.Feedback type='invalid'>
              { this.state.errors.toDate }
              </Form.Control.Feedback>
            </Col>

            <Col sm={1.5} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
                Tree Id
              </Form.Label>
              <Form.Control  type="text" id="heatingValue" name="heatingValue" value={this.state.heatingValue} placeholder="Heating Value" onChange={this.handleChange} 
              isInvalid={ !!this.state.errors.heatingValue } />
              <Form.Control.Feedback type='invalid'>
              { this.state.errors.heatingValue }
              </Form.Control.Feedback>               
            </Col>
            
            

            <Col sm={1} className="my-1">
              <Form.Label htmlFor="inlineFormInputName" srOnly>
              pressure
              </Form.Label>
              <Form.Control type="text" id="pressure" name="pressure" placeholder="Pr Factor" 
              value={this.state.pressure} onChange={this.handleChange} isInvalid={ !!this.state.errors.pressure } />
               <Form.Control.Feedback type='invalid'>
              { this.state.errors.pressure }
              </Form.Control.Feedback>
            </Col>
            
           
            
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

          <Form.Row className="align-items-center">
          <Col xs="auto" className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
                woodborerCount
            </Form.Label>
            <Form.Control type="number" id="fromReading" name="fromReading" placeholder="Reading1" 
            value={this.state.fromReading} onChange={this.handleChange} isInvalid={ !!this.state.errors.fromReading } />
             <Form.Control.Feedback type='invalid'>
              { this.state.errors.fromReading }
              </Form.Control.Feedback>
            </Col>
            <Col xs="auto" className="my-1">              
            </Col>
          
            
          <Col sm={1.5} className="my-1">
            <Form.Label htmlFor="inlineFormInputName" srOnly>
            toReading
            </Form.Label>
            <Form.Control type="number" id="toReading" name="toReading" placeholder="Reading2" 
            value={this.state.toReading} onChange={this.handleChange} isInvalid={ !!this.state.errors.toReading } />
            <Form.Control.Feedback type='invalid'>
              { this.state.errors.toReading }
              </Form.Control.Feedback>
            </Col>
            
            <Col xs="auto" className="my-1">
              
            </Col>
          </Form.Row>

          

          

          

          <Form.Row className="align-items-center">
            <Col sm={3} className="my-1">
            <Button type="" onClick={this.onFormClear}>Clear</Button>
            </Col>
           
            <Col xs="auto" className="my-1">
              <Button type="" onClick={this.onFormSubmit}>Submit</Button>
            </Col>
            <Col xs="auto" className="my-1">              
            </Col>
          </Form.Row>

        </Form>
        </div>
        );
    }
}

export default EnergyBillForm;

