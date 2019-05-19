import React from "react"
import AddTodo from './AddTodo'

export interface Props { }

class Car extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <div className="car"><h1>Redux</h1>
        <AddTodo/>
      </div>
    );
  }
}
export default Car;