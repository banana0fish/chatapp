import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'


class DirectMessages extends React.component {
  state = {
    users: []
  }
  render() {
    const { users } = this.state
    return(
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="mail" /> Direct Messages
          </span> {' '}
          ({users.length})
        </Menu.Item>
      </Menu.Menu>
    )
  }
}

export default DirectMessages