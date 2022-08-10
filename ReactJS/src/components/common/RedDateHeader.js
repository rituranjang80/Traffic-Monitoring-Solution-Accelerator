import React, { Component } from 'react';
import SnackbarError from './SnackbarError';
import SnackbarSuccess from './SnackbarSuccess';
import { formatDateMMDDYY } from '../Services/PostAPI';
import DatePicker from 'react-datepicker';
import { SetRefDate } from '../Store/GetDropdown';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
class RedDateHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formOption: {},
    };
    this.handelInit();
  }
  handelInit = () => {
    const { formOption } = this.state;

    formOption.currentDate =
      cookies.get('REFERENCE_DATE') === undefined
        ? new Date()
        : new Date(cookies.get('REFERENCE_DATE'));
    formOption.errorBoll = false;
    formOption.legalBoll = false;
    formOption.Message = '';
  };
  handleDateCRR = (date, name) => {
    this.setState(
      {
        formOption: {
          currentDate: date,
        },
      },
      async () => {
        let data = formatDateMMDDYY(this.state.formOption.currentDate);

        let res = await SetRefDate(data);
        if (res.Message === 'Success') {
          this.handelMessage('Reference date successfully saved!', 'legalBoll');
          cookies.set('REFERENCE_DATE', this.state.formOption.currentDate);
        } else {
          this.handelMessage(res.Message, 'errorBoll');
        }
      }
    );
  };
  handelMessage = (Message, Boll) => {
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
  render() {
    const { formOption } = this.state;
    return (
      <>
        <SnackbarError
          errorBoll={formOption.errorBoll}
          errorMessage={formOption.Message}
        />

        <SnackbarSuccess
          legalBoll={formOption.legalBoll}
          successMessage={formOption.Message}
        />

        <div className="refdate">
          <div className="refbk">Ref Date</div>
          <DatePicker
            selected={formOption.currentDate}
            name="currentDate"
            dateFormat="MM/dd/yyyy"
            className="form-control inpcalendar"
            popperPlacement="start"
            onChange={(date) => this.handleDateCRR(date, 'currentDate')}
          />
        </div>
      </>
    );
  }
}

export default RedDateHeader;
