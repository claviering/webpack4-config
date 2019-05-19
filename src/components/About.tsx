import React from "react"
import img from './1.jpeg'

export interface Props { compiler?: string; framework?: string; }
interface State {
  title: string;
}

class About extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: 'title'
    };
  }
  render() {
    return (
      <div className="about">
        <h1>About {this.state.title}</h1>
        <img src={img} />
      </div>
    );
  }
}

export default About