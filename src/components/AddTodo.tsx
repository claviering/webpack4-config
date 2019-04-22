import * as React from "react"
import { connect } from 'react-redux'
import { addTodo } from '@/redux/actions'
import { bindActionCreators } from 'redux'

export interface Props { addTodo?: Function; todoList?: Array<any>; }

class AddTodo extends React.Component<Props, {}> {
  componentDidMount() {
    console.log('thism props', this.props);
  }
  click = () => {
    console.log('on click');
    this.props.addTodo('something')
    console.log('thism props.todoList', this.props.todoList);
  }
  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.click()}>
          Add Todo
        </button>
        {
          this.props.todoList.map(item => <h1 key={item.id}>{item.text}</h1>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state: any) => {
  console.log('state', state);
  return {
    todoList: state.todos
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addTodo: bindActionCreators(addTodo, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTodo)
