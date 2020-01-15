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
  const fields = [
    "name",
    "size/weight",
    "comment",
    "quantity"
  ];
    const defaultItem = fields.reduce((obj, field)=>({
      ...obj, 
      [field]:''
    }),{dataToSave:{}})
    const [newItem, setNewItem] = React.useState(defaultItem)

  const saveData = event => {
    const target = event.target;
    let fieldName = target.name;
    let fieldValue = target.value;
      setNewItem((prev)=>(
          {
            ...prev, 
            [fieldName]: fieldValue, 
            [fieldName + "Invalid"]: !fieldValue 
          }
        )
      );
  };

  const checkForm = () => {
    checkFlag = true;
    for(const field of fields){
      if (!newItem[field]) {
        const fieldInvalid = `${field}Invalid`;
        setNewItem((prev)=>({...prev, [fieldInvalid]: true }));
        checkFlag = false;
      }
    }
    return checkFlag;
  };

  const saveForm = event => {
    event.preventDefault();
    if (checkForm()) {
      const dataToSave = fields.reduce((obj, field)=>({
        ...obj,
        [field]:newItem[field]
      }), {})
      setNewItem((prev)=>({...prev, dataToSave }));
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
                  <TextInput
                    id={field}
                    name={field}
                    value={newItem[field] || ""}
                    onChange={saveData}
                    labelText={field}
                    maxLength="100"
                    invalid={newItem[`${field}Invalid`]}
                    invalidText={`Please enter a ${field}..`}
                  />
                ))}
                <br />
                <br />
                <div className="left-align">
                  <Button onClick={saveForm}>Update</Button>
                </div>
              </Form>
            </Tile>
          </div>
        </div>
        <br />
        <br />
        {Object.keys(newItem.dataToSave).length > 0 && (
          <div className="bx--row">
            <div className="bx--col-xs-12 left-align">
              <Tile>
                {Object.keys(newItem.dataToSave).map(item => (
                  <p key={item}>
                    &nbsp;&nbsp;
                    <strong>
                      {item.charAt(0).toUpperCase() +
                        item.slice(1).replace(/([A-Z])/g, " $1")}
                      :
                    </strong>{" "}
                    {newItem.dataToSave[item]}
                  </p>
                ))}
              </Tile>
              <br />
              <br />
            </div>
          </div>
        )}
      </div>
    );
}
export default UpdateForm;
