import React, { useState, useEffect, Component } from "react";
import "./products.css";
import "./data.js";
import { colourOptions } from "./data.js";
import { recomendedOptions } from "./data.js";
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default class filtering_in_PLP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionSelected: null,
    };
  }

  handleChange = (selected) => {
    this.setState({
      optionSelected: selected,
    });
    this.props.handleColors(selected);
  };
  handleChange2 = (selected) => {
    this.setState({
      optionSelected: selected,
    });
    this.props.handleSorting(selected);
  };

  render() {
    return (
      <div class="filter1">
        <div id="label">مصنف بواسطه</div>
        <span
          class="d-inline-block childFilter"
          data-toggle="popover"
          data-trigger="focus"
          data-content="Please selecet account(s)"
        >
          <ReactSelect
            options={colourOptions}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={this.handleChange}
            allowSelectAll={true}
            // value={this.state.optionSelected}
            placeholder="اللون"
          />
        </span>

        <span
          class="d-inline-block childFilter2"
          data-toggle="popover"
          data-trigger="focus"
          data-content="Please selecet account(s)"
        >
          <ReactSelect
            options={recomendedOptions}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            components={{
              Option,
            }}
            onChange={this.handleChange2}
            allowSelectAll={true}
            placeholder="ينصح به"
          />
        </span>
      </div>
    );
  }
}
