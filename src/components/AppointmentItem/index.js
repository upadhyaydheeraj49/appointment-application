// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {id, appointmentTitle, appointmentDate, isStarred} = props.item
  const {toggleAppointmentStar} = props
  const formattedDate = format(new Date(appointmentDate), 'dd MMMM yyyy, EEEE')
  // console.log(isStarred)
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStar = () => {
    toggleAppointmentStar(id)
  }
  return (
    <li>
      <div className="item-top-row">
        <p>{appointmentTitle}</p>
        <button
          className="item-star-button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p>{formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
