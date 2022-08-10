import _ from 'lodash';
import validator from 'validator';

export const handleValidations = (
  CatalogueValidation,
  reqData,
  catalougeTable
) => {
  let validations = _.filter(CatalogueValidation, {
    TABLE_NAME: catalougeTable,
  });
  let AllCoulmn = _.keys(reqData.rowdata[0]);
  let Message = '';
  let result = {};
  for (let i = 0; i < AllCoulmn.length; i++) {
    let validation = _.filter(validations, { COLUMN_NAME: AllCoulmn[i] })[0];
    let field = reqData.rowdata[0][AllCoulmn[i]];
    Message = _.replace(validation.COLUMN_NAME, new RegExp('_', 'g'), ' ');
    if (validation.DATA_TYPE === 'nvarchar') {
      field = field.trim();
      if (validation.IS_NULLABLE === 'NO') {
        if (!field) {
          result.Message = Message + ' is a required field.';
          // this.handelMessage(Message);
          result.isValid = false;
          result.field = AllCoulmn[i];
          return result;
        }
      }
      if (field.length >= validation.CHARACTER_MAXIMUM_LENGTH) {
        result.Message =
          Message +
          ' must be less than ' +
          validation.CHARACTER_MAXIMUM_LENGTH +
          ' characters.';
        // this.handelMessage(Message);
        result.isValid = false;
        result.field = AllCoulmn[i];
        return result;
      }
    }
    if (
      validation.DATA_TYPE === 'int' ||
      validation.DATA_TYPE === 'float' ||
      validation.DATA_TYPE === 'smallint'
    ) {
      if (validation.IS_NULLABLE === 'NO') {
        if (!field) {
          result.Message = Message + ' is a required field.';
          // this.handelMessage(Message);
          result.isValid = false;
          result.field = field;
          return result;
        }
      }
      let chk = validator.isNumeric(field.toString());
      if (!chk) {
        result.Message = Message + ' should be a numeric value.';
        // this.handelMessage(Message);
        result.isValid = false;
        result.field = AllCoulmn[i];
        return result;
      }
      if (field > 99999) {
        result.Message = Message + ' value is not a valid number.';
        // this.handelMessage(Message);
        result.isValid = false;
        result.field = field;
        return result;
      }
      if (
        validation.DATA_TYPE === 'int' ||
        validation.DATA_TYPE === 'smallint'
      ) {
        if (field % 1 !== 0) {
          result.Message = Message + ' should be a integer value.';
          // this.handelMessage(Message);
          result.isValid = false;
          result.field = AllCoulmn[i];
          return result;
        }
      }
    }
    if (validation.DATA_TYPE === 'datetime2') {
      var dateString = '10/23/1950'; // Oct 23
      var dateObject = new Date(dateString);
      let chk = validator.isAfter(field.toString(), dateObject.toString());
      if (validation.IS_NULLABLE === 'NO') {
        result.Message = Message + ' is required';
        // this.handelMessage(Message);
        result.isValid = false;
        result.field = AllCoulmn[i];
        return result;
      }
      if (!chk) {
        result.Message = Message + ' is not a valid date.';
        // this.handelMessage(Message);
        result.isValid = false;
        result.field = AllCoulmn[i];
        return result;
      }
    }
  }
  result.isValid = true;
  return result;
};

export const handleDate = (date) => {
  let result;
  if (date) {
    try {
      result = getFormattedDate(date); //date.substring(0, date.lastIndexOf("T"))
      // result= new Date(date);
    } catch (ex) {
      result = '';
    }
  }
  return result;
};

function getFormattedDate(date1) {
  let date = new Date(date1);
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return month + '/' + day + '/' + year;
}
