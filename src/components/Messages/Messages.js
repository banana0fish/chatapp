import React from 'react'
import MessagesHeader from './MessagesHeader'
import MessageForm from './MessageForm'
import Message from './Message'
import { Segment, Comment } from 'semantic-ui-react'
import firebase from '../../firebase'
import ProgressBar from './ProgressBar'

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref('messages'),
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,
    progressBar: false,
    numUniqueUsers: '',
    searchTerm: '',
    searchLoading: false,
    searchResults: []
  }

  componentDidMount() {
    const { channel, user } = this.state

    if (channel && user ) {
      this.addListeners(channel.id)
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId)
  }

  addMessageListener = channelId => {
    let loadedMessages = []
    this.state.messagesRef.child(channelId).on('child_added', snap => {
      loadedMessages.push(snap.val())
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      })
      this.countUniqueUsers(loadedMessages)
    })
  }


  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages]
    const regex = new RegExp(this.state.searchTerm, "gi")
    const searchResults = channelMessages.reduce((acc, message) => {
      console.log(message.user)
      if (
        message.content && message.content.match(regex) ||
        message.user.name.match(regex)
      ) {
        acc.push(message)
      };
      return acc
    }, []);
    this.setState({ searchResults })
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value,
      searchLoading: true
    },
    () => this.handleSearchMessages()
  )
}

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name)
      }
      return acc
    }, [])
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? 's' : ''}`
    this.setState({ numUniqueUsers})
  }

  displayMessages = messages => (
    messages.length > 0 && messages.map(message =>(
      <Message
        key={message.timestamp}
        message={message}
        user={this.state.user}
      />
    ))
  )

  isProgressBarVisible = percent => {
    if (percent > 0) {
      this.setState({ progressBar: true })
    }
  }

  displayChannelName = channel => channel ? `#${channel.name}` : ''

  render() {
    const { messagesRef, messages, channel, user, progressBar, numUniqueUsers, searchTerm, searchResults } = this.state

    return (
      <React.Fragment>
        <MessagesHeader
          channelName={this.displayChannelName(channel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
        />

        <Segment>
          <Comment.Group className={progressBar ? 'messages__progress' : 'messages'}>
          {searchTerm
            ? this.displayMessages(searchResults)
            : this.displayMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          messagesRef={messagesRef}
          currentChannel={channel}
          currentUser={user}
          isProgressBarVisible={this.isProgressBarVisible}
        />
      </React.Fragment>
    )
  }
}
 export default Messages
