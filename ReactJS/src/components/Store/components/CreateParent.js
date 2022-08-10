import React, { Component } from 'react';

class CreateParent extends Component {
  parenthandleValidation = (requriedField, UIValue) => {
    //const {UIValue}= this.state;
    let errors = {};
    errors.formIsValid = true;
    for (let i = 0; i < requriedField.length; i++) {
      let field = requriedField[i];
      if (!UIValue[field]) {
        errors[field] = 'This is a mandatory field.';
        errors.formIsValid = false;
      }
    }
    this.setState({ errors: errors });
    return errors;
  };
  isNumeric = (n) => {
    return isNaN(n);
  };
  parenthandleValidationDataType = (requriedField, UIValue) => {
    let errors = {};
    errors.formIsValid = true;
    for (let i = 0; i < requriedField.length; i++) {
      let field = requriedField[i];
      if (
        UIValue[field] !== undefined &&
        (this.isNumeric(UIValue[field]) || UIValue[field] <= 0)
      ) {
        errors[field] = 'Required field with valid value only.';
        errors.formIsValid = false;
      }
    }
    this.setState({ errorsnum: errors });
    return errors;
  };

  parenthandelMessage = (Message, Boll) => {
    const { formOption } = this.state;
    formOption[Boll] = true;
    formOption['Message'] = Message;
    this.setState(
      {
        formOption: formOption,
      },
      function () {
        setTimeout(
          function () {
            formOption[Boll] = false;
            this.setState({
              formOption: formOption,
            });
          }.bind(this),
          3000
        );
      }
    );
  };
  roundOff = (value, round) => {
    return parseInt(value * 10 ** (round + 1)) -
      parseInt(value * 10 ** round) * 10 >
      4
      ? parseFloat(
          parseInt((value + parseFloat(1 / 10 ** round)) * 10 ** round)
        ) /
          10 ** round
      : parseFloat(parseInt(value * 10 ** round)) / 10 ** round;
  };
  round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  ArraytoObjectArray = (dropDownList) => {
    let result = [];
    for (var i = 0; i < dropDownList.length; i++) {
      let option = { value: dropDownList[i], name: dropDownList[i] };
      result.push(option);
    }

    return result;
  };

  render() {
    return <></>;
  }
}

export default CreateParent;
