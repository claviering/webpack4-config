import * as React from "react"

export interface Props { }

class Users extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="users"><h1>Users</h1> </div>
    );
  }
}
export default Users;