const Message = ({ msg }) => {
  return(
    <p className = {msg.includes('wrong username')?'message error':'message'}>
      {msg}
    </p>
  )
}

export default Message