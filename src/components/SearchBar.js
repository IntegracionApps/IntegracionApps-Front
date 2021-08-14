import { Input } from "@material-ui/core"
import "../styles/SearchBar.css"
import Search from "@material-ui/icons/Search"

function SearchBar() {
    return(

        <div className="search-box">
            <input className="search-txt" type="text" placeholder="Buscar producto"/>
            <div className="search-btn"><Search></Search></div>
        </div>


        
    )
}

export default SearchBar