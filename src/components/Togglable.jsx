import { useState,forwardRef,useImperativeHandle } from 'react'
import propTypes from 'prop-types'
const Togglable = forwardRef((props,ref) => {
  const [visible,setVisible] = useState(false)

  const hideWhenVisible = { display:visible?'none':'' }
  const showWhenVisible = { display:visible?'':'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref,() => {
    return{
      toggleVisibility
    }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLable}</button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick = {toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLable:propTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable