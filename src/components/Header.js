import { useEffect, useRef, useState } from 'react'
import Logo from '../images/Logo.png'
export const Header = () => {

  const [theme, setTheme] = useState( JSON.parse(localStorage.getItem("theme")) ||"dark");
  const fileInputRef = useRef(null)

  useEffect(()=>{
    localStorage.setItem("theme", JSON.stringify(theme));
    document.documentElement.removeAttribute("class")
    document.documentElement.classList.add(theme)
  },[theme])

  const handleExport = () => {
    const data = {
      todo: JSON.parse(localStorage.getItem("todo") || "[]"),
      todoDate: JSON.parse(localStorage.getItem("todoDate") || "[]"),
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `norzah-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => fileInputRef.current && fileInputRef.current.click()

  const handleImportFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result)
        if (!Array.isArray(parsed.todo) || !Array.isArray(parsed.todoDate)) throw new Error("bad shape")
        if (window.confirm("Importing will replace all your current tasks. Continue?")) {
          localStorage.setItem("todo", JSON.stringify(parsed.todo))
          localStorage.setItem("todoDate", JSON.stringify(parsed.todoDate))
          window.location.reload()
        }
      } catch {
        window.alert("That file doesn't look like a valid NorZah backup.")
      }
    }
    reader.readAsText(file)
    e.target.value = ""
  }

  return (
    <header>
      <div className="logo">
        <span><img src={Logo} alt="logo" /></span>
        <span className="brand">
          <span className="name">NorZah CRPTask</span>
          <span className="tag">Plan your days</span>
        </span>
      </div>
      <div className="headerRight">
        <div className="headerActions">
          <button type="button" className="iconbtn" title="Export backup" aria-label="Export backup" onClick={handleExport}>
            <i className="bi bi-download"></i>
          </button>
          <button type="button" className="iconbtn" title="Import backup" aria-label="Import backup" onClick={handleImportClick}>
            <i className="bi bi-upload"></i>
          </button>
          <input type="file" accept="application/json" ref={fileInputRef} onChange={handleImportFile} style={{ display: "none" }} />
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
      </div>
    </header>
  )
}
