import { useEffect, useState } from 'react'
import Logo from '../images/Logo.png'
export const Header = () => {

  const [theme, setTheme] = useState( JSON.parse(localStorage.getItem("theme")) ||"dark");
  useEffect(()=>{
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.removeAttribute("class")
    document.documentElement.classList.add(theme)
  },[theme])

  return (
    <header>
      <div className="logo">
        <span><img src={Logo} alt="logo" /></span>
        <span className="brand">
          <span className="name">NorZah CRPTask</span>
          <span className="tag">Plan your days</span>
        </span>
      </div>
      <div className="themeSelector">
        <span title="Light" onClick={()=>setTheme("light")} className={theme==="light"? "light activeTheme": "light"}></span>
        <span title="Dark" onClick={()=>setTheme("dark")} className={theme==="dark"? "dark activeTheme": "dark"}></span>
        <span title="Medium" onClick={()=>setTheme("medium")} className={theme==="medium"? "medium activeTheme": "medium"}></span>
        <span title="Aurora" onClick={()=>setTheme("gOne")} className={theme ==="gOne"? "gOne activeTheme": "gOne"}></span>
        <span title="Nebula" onClick={()=>setTheme("gTwo")} className={theme ==="gTwo"? "gTwo activeTheme": "gTwo"}></span>
        <span title="Orchid" onClick={()=>setTheme("gThree")} className={theme ==="gThree"? "gThree activeTheme": "gThree"}></span>
        <span title="Kali" onClick={()=>setTheme("gKali")} className={theme ==="gKali"? "gKali activeTheme": "gKali"}></span>
        <span title="Nova" onClick={()=>setTheme("gGood")} className={theme==="gGood"? "gGood activeTheme": "gGood"}></span>
      </div>
    </header>
  )
}

