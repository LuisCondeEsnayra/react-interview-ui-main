
import React, { useState } from "react"; 
import EditableWidget from "../EditableWidget";
import { deleteWidget } from "../../lib/apiConnect";
import DisplayWidget from "../WidgetDisplay";

const WidgetCard = ({ widget, onUpdateWidgets }) => {
    const {name} = widget;

    const [edit, setEdit] = useState(false);

    const handleEdit = () => {
        setEdit(true);
    };
  


    const refreshWidgets = ( ) => {
        setEdit(false);
        onUpdateWidgets()
    }

    const handleCancel = () => {
        setEdit(false);
    };

    const handleDelete = () => {
        deleteWidget(name).catch((error) =>
            console.error("Error deleting widget", error)
        );
        onUpdateWidgets()
    };


    return (
        <>
            {edit ? <EditableWidget
                widget={widget}
                refreshWidgets={refreshWidgets}
                handleCancel={handleCancel} 
            /> :
                <DisplayWidget
                    widget={widget} handleDelete={handleDelete} handleEdit={handleEdit}
                />
            }

        </>
    );
};

export default WidgetCard;