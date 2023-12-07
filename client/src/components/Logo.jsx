import logo from "../assets/images/logo.svg";
const Logo = (props) => {
  return (
    <img src={logo} alt="jobify-logo" className={`logo ${props.className}`} />
  )
}
export default Logo