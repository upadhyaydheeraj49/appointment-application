// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    name: '',
    date: '',
    showStarred: false,
  }

  updateName = event => {
    this.setState({
      name: event.target.value,
    })
  }

  updateDate = event => {
    // console.log(event.target.value)
    this.setState({
      date: event.target.value,
    })
  }

  addAppointment = event => {
    event.preventDefault()
    this.setState(prevState => {
      const {appointmentsList, name, date} = prevState
      const newAppointment = {
        id: uuidv4(),
        appointmentTitle: name,
        appointmentDate: date,
        isStarred: false,
      }
      return {
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        name: '',
        date: '',
      }
    })
  }

  toggleAppointmentStar = appointmentId => {
    this.setState(prevState => {
      const {appointmentsList} = prevState
      const updatedAppointmentList = appointmentsList.map(item => {
        if (item.id === appointmentId) {
          return {
            ...item,
            isStarred: !item.isStarred,
          }
        }
        return item
      })
      return {
        appointmentsList: updatedAppointmentList,
      }
    })
  }

  filterStarredAppointments = () => {
    const {appointmentsList} = this.state
    const resultantList = appointmentsList.filter(
      item => item.isStarred === true,
    )
    return resultantList
  }

  onToggleStarredAppointments = () => {
    this.setState(prevState => ({
      showStarred: !prevState.showStarred,
    }))
  }

  render() {
    const {appointmentsList, name, date, showStarred} = this.state
    const resultantListToRender = showStarred
      ? this.filterStarredAppointments()
      : appointmentsList
    const filterBtnClass = showStarred ? 'filled-starred-btn' : ''
    return (
      <div className="main-container">
        <div className="appointment-card">
          <div className="top-card-container">
            <form className="appointment-form" onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="nameEl">TITLE</label>
              <input
                type="text"
                id="nameEl"
                onChange={this.updateName}
                value={name}
                placeholder="Title"
              />
              <label htmlFor="dateEl">DATE</label>
              <input
                type="date"
                id="dateEl"
                onChange={this.updateDate}
                value={date}
              />
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />

          <div className="appointments-row">
            <h5>Appointments</h5>
            <button
              className={`starred-outline-btn ${filterBtnClass}`}
              onClick={this.onToggleStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul>
            {resultantListToRender.map(item => (
              <AppointmentItem
                key={item.id}
                item={item}
                toggleAppointmentStar={this.toggleAppointmentStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
