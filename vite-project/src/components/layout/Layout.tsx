import Footer from './footer/Footer'
import Header from './header/Header'
import './Layout.css'
import Main from './main/Main'

export default function Layout() {
    return (
        <div className="layout">
            <header> <Header />  </header>
            <main><Main /></main>
            <footer> < Footer /> </footer>
        </div>

    )
}