import AddTodo from './AddTodo'

class Car extends React.Component {
  constructor() {
    super();
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