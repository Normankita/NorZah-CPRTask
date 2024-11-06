import { useEffect, useState } from 'react'
import Logo from '../images/Logo.png'
export const Header = () => {

  const [theme, setTheme] = useState( JSON.parse(localStorage.getItem("theme")) ||"light");
  useEffect(()=>{
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.removeAttribute("class")
    document.documentElement.classList.add(theme)
  },[theme])

  return (
    <header>
      <div className="logo">
        <span><img src={Logo} alt="logo" /></span>
        <span><p>NorZah CRPTask</p></span>
      </div>
      <div className="themeSelector">
        <span onClick={()=>setTheme("light")} className={theme==="light"? "light activeTheme": "light"}></span>
        <span onClick={()=>setTheme("dark")} className={theme==="dark"? "dark activeTheme": "dark"}></span>
        <span onClick={()=>setTheme("medium")} className={theme==="medium"? "medium activeTheme": "medium"}></span>
        <span onClick={()=>setTheme("gOne")} className={theme ==="gOne"? "gOne activeTheme": "gOne"}></span>
        <span onClick={()=>setTheme("gTwo")} className={theme ==="gTwo"? "gTwo activeTheme": "gTwo"}></span>
        <span onClick={()=>setTheme("gThree")} className={theme ==="gThree"? "gThree activeTheme": "gThree"}></span>
        <span onClick={()=>setTheme("gKali")} className={theme ==="gKali"? "gKali activeTheme": "gKali"}></span>
        <span onClick={()=>setTheme("gGood")} className={theme==="gGood"? "gGood activeTheme": "gGood"}></span>
      </div>
    </header>
  )
}

