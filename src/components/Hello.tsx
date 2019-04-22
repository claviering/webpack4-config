import * as React from "react"
import About from '@/components/About'

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <div>
          <About/>
          <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        </div>
    }
}