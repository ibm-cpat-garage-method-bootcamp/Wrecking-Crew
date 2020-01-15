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
    }
  ];
  const requiredFields = ["name"];

  const defaultItem = fields.reduce((obj, field)=>({
    ...obj, 
    [field.name]:''
  }),{})

  const isFieldInvalid = (field, fieldValue)=>{
    return !fieldValue && requiredFields.includes(field)
  }

  const [newItem, setNewItem] = React.useState(defaultItem)

  const saveData = event => {
    const target = event.target;
    let fieldName = target.name;
    let fieldValue = target.value;
      setNewItem((prev)=>(
          {
            ...prev, 
            [fieldName]: fieldValue, 
            [fieldName + "Invalid"]: isFieldInvalid(fieldName, fieldValue) 
          }
        )
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
                {fields.map(field=>(
                  field.type==="text"?
                  <TextInput
                    id={field.name}
                    name={field.name}
                    value={newItem[field.name] || ""}
                    onChange={saveData}
                    labelText={field.name}
                    maxLength="100"
                    invalid={newItem[`${field.name}Invalid`]}
                    invalidText={`Please enter a ${field.name}..`}
                    data-testid={`input-${field.name}`}
                  />:null
                ))}
                <br />
                <br />
                <div className="left-align">
                  <Button onClick={saveForm} data-testid="add-catalog-item-button">Add</Button>
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
