import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { List, Grid } from 'semantic-ui-react'
import { loadTasks } from '../actions'
import Taskform from '../components/Taskform'
import sortBy from 'lodash/sortBy'

class TasklistPage extends Component {
  componentWillMount() {
    console.log("TasklistPage.componentWillMount")
    this.props.loadTasks();
  }

  renderItem(task) {
    return (
      // <tr key={task.id}>
        // <td>
          <List.Item key={task.id}>
            <List.Content>
              <Link to={`/tasklist/${task.processDefinitionId}/${task.id}`}>
                <List.Header>{task.name}</List.Header>
              </Link>
            </List.Content>
          </List.Item>
        // </td>
        // <td>{(taskId == task.id) ? taskForm : ""}</td>
      // </tr>
    )
    // return (
    //   // <div><a href='/tasklist/${task.processDefinitionId}/${task.id}'><div class="header">dataTask</div></a></div>
    //   <li key={task.id}>
    //     <Link to={`/tasklist/${task.processDefinitionId}/${task.id}`}>{task.name}</Link>
    //   </li>
    // )
  }

  render() {
    console.log("TasklistPage.render. props: ", this.props)
    let { task } = this.props
    let taskForm = ''
    if (this.props.processDefinitionId) {
      taskForm = <Taskform/>
    } else {
      taskForm = <div>Tasks:</div>
      // taskForm = <div/>
    }

    if (!task) {
      return (<div>Loading tasks</div>)
    } else {
      task = sortBy(task, 'created').reverse()
      return (
        // <Grid divided>
        //   <Grid.Row>
        //     <Grid.Column width={5}>
        //       <List divided relaxed>
        //       {task.map((item) => this.renderItem(item))}
        //       </List>
        //     </Grid.Column>
        //     <Grid.Column width={10}>
        //       {taskForm}
        //     </Grid.Column>
        //   </Grid.Row>
        // </Grid>

        // <List divided relaxed>
        //   <table>
        //     <tbody>
        //       {task.map((item) => this.renderItem(item, this.props.taskId, taskForm))}
        //     </tbody>
        //   </table>
        // </List>

        <>
        <List divided relaxed>
          {task.map((item) => this.renderItem(item))}
        </List>
        <div>{taskForm}</div>
        </>

        // <>
        //   <div>BPMN</div>
        //   <ul>
        //     {task.map((item) => this.renderItem(item))}
        //   </ul> 
        // </>
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const params = ownProps.match.params
  return {
    ...params,
    ...state.entities
  }
}

export default withRouter(connect(mapStateToProps, {
  loadTasks
})(TasklistPage))
