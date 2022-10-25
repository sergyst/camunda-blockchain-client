import React from 'react'
import { connect } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

const App = ({actions, children}) => (
  <div>
    <Container text>
      <Header as='h2'>Application</Header>
    </Container>
  </div>
)

const mapStateToProps = state => ({
})

export default connect(
  mapStateToProps,
)(App)
