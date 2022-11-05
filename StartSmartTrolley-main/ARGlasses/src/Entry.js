import React from "react";
import { Component } from "react";

class entry extends Component {
  render() {
    return (
      <tbody>
        <tr>
          <td>
            <span className={this.getBadgeClasses()}>
              {this.props.currentValue} / {this.props.value}
            </span>
          </td>
          <td>{this.props.name}</td>
        </tr>
      </tbody>
    );
  }

  getBadgeClasses() {
    if (this.props.value - this.props.currentValue === 0) {
      return "badge bg-success";
    } else if (this.props.value - this.props.currentValue < 0) {
      return "badge bg-warning";
    }
    return "badge bg-primary";
  }
}

export default entry;
