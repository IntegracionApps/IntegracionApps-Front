import React from "react";
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({

    root: {
        // display: "flex",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#FFAA56",
        // flexDirection: "row",
    }

}));


export default function Home() {

    return (
        <div className={useStyles().root}>
            <div className={useStyles().header}>
                <a>Título</a>
                <a>Imagen? Barra de búsqueda?</a>
                <a>sidebar button</a>
            </div>
            <a>grid</a>

        </div>
    )
}