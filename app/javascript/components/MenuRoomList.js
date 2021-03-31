import React from 'react';
import MenuRoomItem from './MenuRoomItem';


export default function MenuRoomList({rooms}) {
    // console.log(typeof rooms)
    const renderRooms = () => {
        return  <MenuRoomItem room={rooms}/>

    }

    return (
        <div>
            {/* {rooms.length > 0 ?  */}
            
            {renderRooms()}

            
              {/* : <p className="text-center">Nothing to republish</p>} */}
        </div>
    )
}
