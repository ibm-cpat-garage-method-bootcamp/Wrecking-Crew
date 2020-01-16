import React, { Component } from "react";
import {
  TextInput,
  Form,
  DropdownV2,
  Button,
  Tile
} from "carbon-components-react";
import Header from "../pattern-components/Header";
import "../pattern-components/patterns.scss";

let checkFlag = true;

function StoreAisleInputs(props){
  const {onChange, value} = props;

  return <>
    {  value.map((storeAislePair, idx, storeAisleArray)=>(
        <div style={{display:'flex', width:'100%'}}>
        <TextInput
        id={'store'}
        name={'store'}
        value={storeAislePair.store}
        onChange={(e)=>{
        const newValue = [...storeAisleArray];
        newValue.splice(idx, 1, {store:e.target.value, aisle:storeAislePair.aisle})
        onChange('store/aisle',newValue)
        }}
        labelText={'store'}
        maxLength="100"
        // invalid={newItem.storeInvalid}
        invalidText={`Please enter a valid store...`}
        data-testid={`input-store`}
      />
      &nbsp;
      &nbsp;
      <TextInput
      id={'aisle'}
      name={'aisle'}
        value={storeAislePair.aisle}
      onChange={(e)=>{
        const newValue = [...storeAisleArray];
        newValue.splice(idx, 1, {aisle:e.target.value, store:storeAislePair.store})
        onChange('store/aisle',newValue)
        }}
      labelText={'aisle'}
      maxLength="100"
      // invalid={newItem.storeInvalid}
      invalidText={`Please enter a valid aisle...`}
      data-testid={`input-aisle`}
      /> 
      </div>
    ))}
    <div style={{display:'flex'}}>
      <Button onClick={()=>onChange('store/aisle', value.concat([{store:'', aisle:''}]))}>Add Store</Button>
        &nbsp;
        &nbsp;
      <Button onClick={()=>onChange('store/aisle', value.slice(0,-1))}>Remove Store</Button>
    </div>
</>
}

function UpdateForm (props) {
  const {catalogItems, addCatalogItem} = props;
  const fields = [
    {
      name:"name",
      type:"text"
    },
    {
      name:"size/weight",
      type:"text"
    },
    {
     name:"comment",
     type:"text"
    },
    {
      name:"store/aisle",
      CustomComponent:StoreAisleInputs,
      defaultValue:[]
    }
  ];
  const requiredFields = ["name", "store/aisle"];

  const defaultItem = fields.reduce((obj, field)=>({
    ...obj, 
    [field.name]:field.defaultValue||''
  }),{})

  const isFieldInvalid = (field, fieldValue)=>{
    if(typeof fieldValue !== 'object'){
      return !fieldValue && requiredFields.includes(field)
    }else if(Array.isArray(fieldValue)){
      return fieldValue.reduce((isInvalid,arrayItem)=>{
        return isFieldInvalid(field, arrayItem) || isInvalid
      }, false);
    }else{
      return isFieldInvalid(field, Object.values(fieldValue))
    }
  }

  const [newItem, setNewItem] = React.useState(defaultItem)

  const saveData = (fieldName, fieldValue) => {
      setNewItem((prev)=>{
        const newItemValue = {
          ...prev, 
          [fieldName]: fieldValue, 
          [fieldName + "Invalid"]: isFieldInvalid(fieldName, fieldValue) 
        };
        return newItemValue
        }
      );
  };

  const checkForm = () => {
    checkFlag = true;
    for(const field of fields){
      if (isFieldInvalid(field.name, newItem[field.name])) {
        const fieldInvalid = `${field.name}Invalid`;
        setNewItem((prev)=>({...prev, [fieldInvalid]: true }));
        checkFlag = false;
      }
    }
    return checkFlag;
  };

  const saveForm = event => {
    event.preventDefault();
    if (checkForm()) {
      const itemToAdd = fields.reduce((obj, field)=>({
        ...obj,
        [field.name]:newItem[field.name]
      }), {})
      const duplicateItem = !!catalogItems.find(catalogItem=>catalogItem.name.toLowerCase()===itemToAdd.name.toLowerCase())
      if(duplicateItem){
      console.log(`Item ${itemToAdd.name} already exists`);
      return;
    }
      setNewItem(defaultItem);
      addCatalogItem(itemToAdd);
    }
  };

    return (
      <div className="bx--grid pattern-container">
        <Header
          title="New Catalog Item"
        />
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <Tile>
              <Form>
                {fields.map(field=>{
                  const {CustomComponent} = field
                  return field.type==="text"?
                  <TextInput
                    id={field.name}
                    name={field.name}
                    value={newItem[field.name] || ""}
                    onChange={(e)=>saveData(field.name, e.target.value)}
                    labelText={field.name}
                    maxLength="100"
                    invalid={newItem[`${field.name}Invalid`]}
                    invalidText={`Please enter a ${field.name}..`}
                    data-testid={`input-${field.name}`}
                  />:<CustomComponent onChange={saveData} value={newItem[field.name]}/>
                })}
                <br />
                <br />
                <div className="left-align">
                  <Button onClick={saveForm} data-testid="add-catalog-item-button">Add Catalog Item</Button>
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
      </div>
    );
}
export default UpdateForm;
