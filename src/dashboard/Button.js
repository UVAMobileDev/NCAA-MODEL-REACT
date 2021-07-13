import { Height } from '@material-ui/icons'
import PropTypes from 'prop-types'


const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ color:'white',backgroundColor: color, height:30, display: 'inline-block', fontSize:15, borderRadius: 5, marginBottom: 20}}
      className='btn'
      
      
      
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
