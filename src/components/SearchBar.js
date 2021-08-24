import Search from "@material-ui/icons/Search"
import "../styles/SearchBar.css"

export default function SearchBar() {
    return (

        <div className="search-box">
            <input className="search-txt" type="text" placeholder="Buscar producto" />
            <div className="search-btn"><Search></Search></div>
        </div>

    )
}
