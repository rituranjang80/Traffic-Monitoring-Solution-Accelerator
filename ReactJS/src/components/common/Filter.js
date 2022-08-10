import React, { Component } from 'react';
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import SelectSearch from 'react-select-search';
import DatePicker from 'react-datepicker';

let FilterDatas = [];
class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initinalFormFill: {},
      UIValues: {},
      data: this.props.data,
      fields: {
        inputObj: [],
        dateObj: [],
        dropdonwObj: [],
      },
    };
  }

  filterField = () => {
    let { data } = this.state;

    let inputObj = data.filter((item) => item.type === 'text');
    let dateObj = data.filter((item) => item.type === 'date');
    let dropdonwObj = data.filter((item) => item.type === 'dropdown');

    this.setState({
      fields: {
        inputObj: inputObj,
        dateObj: dateObj,
        dropdonwObj: dropdonwObj,
      },
    });
  };
  handleChangeGen = (event) => {
    const { UIValues } = this.state;
    UIValues[event.target.name] = event.target.value;
    this.setState({
      [UIValues]: UIValues,
    });

    this.props.sendData(this.state.UIValues);
  };

  handleSeachableDropdonw = (val, name) => {
    const { UIValues } = this.state;
    UIValues[name] = val;
    this.setState({
      [UIValues]: UIValues,
    });
    this.props.sendData(this.state.UIValues);
  };

  handleDate = (date, name) => {
    const { UIValues } = this.state;
    UIValues[name] = date;
    this.setState({
      [UIValues]: UIValues,
    });
    this.props.sendData(this.state.UIValues);
  };

  handleChangeGenChecked = (event, i) => {
    let { data, UIValues } = this.state;
    data[i].isChecked = event.target.checked;
    this.setState(
      {
        [data]: data,
      },
      () => {
        this.filterField();
      }
    );
    if (data[i].isChecked === false) {
      UIValues[data[i].id] = '';
    }
    this.props.sendData(UIValues);
  };

  render() {
    const { fields, data, UIValues } = this.state;
    return (
      <div className="posfilter">
        <div className="selectFilter">
          Add Fields
          <ul>
            {data &&
              data.map((item, i) => (
                <li key={item.id}>
                  <Form.Group className="centercheck">
                    <Form.Check
                      type="checkbox"
                      id={item.id}
                      htmlFor={item.id}
                      checked={item.isChecked}
                      onChange={(e) => this.handleChangeGenChecked(e, i)}
                      name={item.name}
                      label={item.name}
                    />
                  </Form.Group>
                </li>
              ))}
          </ul>
        </div>
        <div className="databox filter">
          <Row>
            {fields &&
              fields.inputObj.map((item) =>
                item.isChecked === true ? (
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>{item.name}</Form.Label>
                      <FormControl
                        name={item.id}
                        value={UIValues[item.name]}
                        onChange={this.handleChangeGen}
                      />
                    </Form.Group>
                  </Col>
                ) : null
              )}

            {fields &&
              fields.dateObj.map((item) =>
                item.isChecked === true ? (
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>{item.name}</Form.Label>
                      <DatePicker
                        selected={UIValues[item.id]}
                        autoComplete="off"
                        dateFormat="MM/dd/yyyy"
                        className="form-control inpcalendar"
                        popperPlacement="start"
                        name={item.id}
                        value={UIValues[item.id]}
                        onChange={(date) => this.handleDate(date, [item.id])}
                      />
                    </Form.Group>
                  </Col>
                ) : null
              )}

            {fields &&
              fields.dropdonwObj.map((item) =>
                item.isChecked === true ? (
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>{item.name}</Form.Label>
                      <SelectSearch
                        container="rowselect"
                        search
                        options={item.values}
                        select="test"
                        name={item.id}
                        onChange={(val) =>
                          this.handleSeachableDropdonw(val, item.id)
                        }
                        value={UIValues[item.id]}
                        placeholder="Select..."
                      />
                    </Form.Group>
                  </Col>
                ) : null
              )}
          </Row>
        </div>
      </div>
    );
  }
}

export default Filter;
